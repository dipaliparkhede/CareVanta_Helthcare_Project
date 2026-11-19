const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  medicalHistory: [String],
  allergies: [String],
  currentMedications: [String],
  chronicConditions: [String],
  heightCm: Number,
  weightKg: Number,
  insuranceProvider: String,
  insurancePolicyNumber: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
