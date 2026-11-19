const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const asyncHandler = require('../utils/asyncHandler');
const { getPagination, paginateResponse } = require('../utils/helpers');

// Discover Doctors with Filters (Specialization, Rating, Fee, Search)
const getDoctors = asyncHandler(async (req, res) => {
  const { specialization, search, minFee, maxFee, minRating } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  let query = { isVerified: true };

  if (specialization && specialization !== 'All') {
    query.specialization = new RegExp(specialization, 'i');
  }
  if (minFee || maxFee) {
    query.consultationFee = {};
    if (minFee) query.consultationFee.$gte = Number(minFee);
    if (maxFee) query.consultationFee.$lte = Number(maxFee);
  }
  if (minRating) {
    query.rating = { $gte: Number(minRating) };
  }

  const doctors = await Doctor.find(query)
    .populate('user', 'firstName lastName email avatar phone')
    .populate('hospital', 'name address')
    .sort({ rating: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Doctor.countDocuments(query);

  res.json({
    success: true,
    ...paginateResponse(doctors, total, page, limit)
  });
});

// Doctor by ID
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)
    .populate('user', 'firstName lastName email avatar phone')
    .populate('hospital', 'name address bedCapacity');

  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found.' });
  }

  res.json({ success: true, doctor });
});

// Update Doctor Availability
const updateAvailability = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user.id });
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor profile not found.' });
  }

  const { availableDays, availableTimeSlots, consultationFee, videoConsultationEnabled } = req.body;
  if (availableDays) doctor.availableDays = availableDays;
  if (availableTimeSlots) doctor.availableTimeSlots = availableTimeSlots;
  if (consultationFee) doctor.consultationFee = consultationFee;
  if (typeof videoConsultationEnabled === 'boolean') doctor.videoConsultationEnabled = videoConsultationEnabled;

  await doctor.save();
  res.json({ success: true, message: 'Availability and preferences updated.', doctor });
});

// Doctor Dashboard Stats
const getDoctorStats = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user.id });
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor profile not found.' });
  }

  const totalAppointments = await Appointment.countDocuments({ doctor: doctor._id });
  const completedAppointments = await Appointment.countDocuments({ doctor: doctor._id, status: 'Completed' });
  const upcomingAppointments = await Appointment.countDocuments({ 
    doctor: doctor._id, 
    status: { $in: ['Confirmed', 'Waiting Room'] } 
  });
  
  const estimatedEarnings = completedAppointments * doctor.consultationFee;

  res.json({
    success: true,
    stats: {
      totalAppointments,
      completedAppointments,
      upcomingAppointments,
      rating: doctor.rating,
      totalReviews: doctor.totalReviews,
      consultationFee: doctor.consultationFee,
      estimatedEarnings
    }
  });
});

module.exports = { getDoctors, getDoctorById, updateAvailability, getDoctorStats };
