const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { generateUniqueId } = require('../utils/helpers');

// Create Digital Prescription
const createPrescription = asyncHandler(async (req, res) => {
  const { patientId, appointmentId, diagnosis, clinicalNotes, medicines, lifestyleAdvice, followUpDate } = req.body;

  const doctor = await Doctor.findOne({ user: req.user.id });
  if (!doctor) {
    return res.status(403).json({ success: false, message: 'Only verified medical practitioners can prescribe.' });
  }

  const prescriptionNumber = generateUniqueId('RX');
  const verificationCode = `CV-RX-${Date.now().toString(36).toUpperCase()}`;

  const prescription = await Prescription.create({
    prescriptionNumber,
    appointment: appointmentId,
    doctor: doctor._id,
    patient: patientId,
    diagnosis,
    clinicalNotes,
    medicines,
    lifestyleAdvice,
    followUpDate,
    verificationCode,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://carevanta.ai/verify-prescription/' + verificationCode)}`
  });

  res.status(201).json({
    success: true,
    message: 'Digital Prescription saved and finalized.',
    prescription
  });
});

// Patient: Get My Prescriptions
const getMyPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ patient: req.user.id })
    .populate({
      path: 'doctor',
      populate: { path: 'user', select: 'firstName lastName' }
    })
    .sort({ createdAt: -1 });

  res.json({ success: true, count: prescriptions.length, prescriptions });
});

module.exports = { createPrescription, getMyPrescriptions };
