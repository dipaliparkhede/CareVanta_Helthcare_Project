const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const Pharmacy = require('../models/Pharmacy');
const Laboratory = require('../models/Laboratory');
const Appointment = require('../models/Appointment');
const Order = require('../models/Order');
const LabBooking = require('../models/LabBooking');
const MedicalReport = require('../models/MedicalReport');
const AuditLog = require('../models/AuditLog');
const asyncHandler = require('../utils/asyncHandler');

// Ecosystem Overview Metrics
const getEcosystemStats = asyncHandler(async (req, res) => {
  const [
    totalPatients,
    totalDoctors,
    totalHospitals,
    totalPharmacies,
    totalLaboratories,
    totalAppointments,
    totalOrders,
    totalLabBookings,
    totalReports
  ] = await Promise.all([
    User.countDocuments({ role: 'patient' }),
    Doctor.countDocuments(),
    Hospital.countDocuments(),
    Pharmacy.countDocuments(),
    Laboratory.countDocuments(),
    Appointment.countDocuments(),
    Order.countDocuments(),
    LabBooking.countDocuments(),
    MedicalReport.countDocuments()
  ]);

  const orders = await Order.find({ paymentStatus: 'Completed' }, 'totalAmount');
  const appointments = await Appointment.find({ paymentStatus: 'Paid' }, 'consultationFee');
  const pharmacyRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const consultationRevenue = appointments.reduce((sum, a) => sum + (a.consultationFee || 0), 0);

  res.json({
    success: true,
    stats: {
      totalPatients,
      totalDoctors,
      totalHospitals,
      totalPharmacies,
      totalLaboratories,
      totalAppointments,
      totalOrders,
      totalLabBookings,
      totalReports,
      totalRevenue: pharmacyRevenue + consultationRevenue,
      pharmacyRevenue,
      consultationRevenue
    }
  });
});

// Verification Queue (Pending Doctors/Hospitals/Labs)
const getPendingVerifications = asyncHandler(async (req, res) => {
  const pendingDoctors = await Doctor.find({ isVerified: false }).populate('user');
  const pendingHospitals = await Hospital.find({ isVerified: false });
  const pendingPharmacies = await Pharmacy.find({ isVerified: false });
  const pendingLabs = await Laboratory.find({ isVerified: false });

  res.json({
    success: true,
    pending: {
      doctors: pendingDoctors,
      hospitals: pendingHospitals,
      pharmacies: pendingPharmacies,
      laboratories: pendingLabs
    }
  });
});

// Audit Logs
const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, count: logs.length, logs });
});

module.exports = { getEcosystemStats, getPendingVerifications, getAuditLogs };
