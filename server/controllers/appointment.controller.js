const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');
const { generateUniqueId, getPagination, paginateResponse } = require('../utils/helpers');

// Book Appointment with Double-Booking Prevention
const bookAppointment = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate, timeSlot, type, symptoms, patientNotes } = req.body;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found.' });
  }

  const parsedDate = new Date(appointmentDate);
  // Normalize to start of day for accurate slot matching
  const dayStart = new Date(parsedDate.setHours(0, 0, 0, 0));

  // Check double-booking
  const existingSlot = await Appointment.findOne({
    doctor: doctorId,
    appointmentDate: {
      $gte: dayStart,
      $lt: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
    },
    timeSlot,
    status: { $nin: ['Cancelled', 'Rescheduled'] }
  });

  if (existingSlot) {
    return res.status(409).json({
      success: false,
      message: `The time slot ${timeSlot} on this date is already booked. Please choose another slot.`
    });
  }

  const appointmentNumber = generateUniqueId('APT');
  const meetingRoomId = `meet-${appointmentNumber.toLowerCase()}`;

  const appointment = await Appointment.create({
    appointmentNumber,
    patient: req.user.id,
    doctor: doctorId,
    hospital: doctor.hospital,
    appointmentDate: dayStart,
    timeSlot,
    type: type || 'Video Consultation',
    consultationFee: doctor.consultationFee,
    paymentStatus: 'Paid', // Verified upon checkout
    status: 'Confirmed',
    symptoms,
    patientNotes,
    meetingRoomId
  });

  // Create In-App Notification
  await Notification.create({
    recipient: req.user.id,
    title: 'Appointment Confirmed',
    message: `Your appointment with doctor has been confirmed for ${timeSlot} on ${dayStart.toLocaleDateString()}. Room: ${meetingRoomId}`,
    category: 'Appointment',
    actionLink: `/patient/appointments`
  });

  res.status(201).json({
    success: true,
    message: 'Appointment successfully scheduled and confirmed.',
    appointment
  });
});

// Patient Appointments List
const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user.id })
    .populate({
      path: 'doctor',
      populate: { path: 'user', select: 'firstName lastName avatar email phone' }
    })
    .sort({ appointmentDate: -1 });

  res.json({ success: true, count: appointments.length, appointments });
});

// Doctor Appointments List
const getDoctorAppointments = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user.id });
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor profile not found.' });
  }

  const appointments = await Appointment.find({ doctor: doctor._id })
    .populate('patient', 'firstName lastName email phone avatar bloodGroup')
    .sort({ appointmentDate: 1 });

  res.json({ success: true, count: appointments.length, appointments });
});

// Cancel or Reschedule
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status, cancellationReason, rescheduledTo } = req.body;
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found.' });
  }

  if (status) appointment.status = status;
  if (cancellationReason) appointment.cancellationReason = cancellationReason;
  if (rescheduledTo) appointment.rescheduledTo = rescheduledTo;

  await appointment.save();
  res.json({ success: true, message: `Appointment updated to ${appointment.status}.`, appointment });
});

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
};
