const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  prescriptionNumber: { type: String, required: true, unique: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  diagnosis: String,
  clinicalNotes: String,
  medicines: [{
    name: { type: String, required: true },
    strength: String, // '500mg'
    dosage: String,   // '1 tablet'
    frequency: String,// 'Twice daily'
    duration: String, // '5 days'
    route: { type: String, default: 'Oral' },
    instructions: String // 'After food'
  }],
  lifestyleAdvice: [String],
  followUpDate: Date,
  doctorSignatureUrl: String,
  qrCodeUrl: String,
  pdfUrl: String,
  verificationCode: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
