const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true, unique: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startedAt: Date,
  completedAt: Date,
  doctorNotes: String,
  diagnosis: String,
  vitalsRecorded: {
    bloodPressure: String,
    heartRate: Number,
    temperatureCelsius: Number,
    spo2: Number,
    weightKg: Number
  },
  followUpDate: Date,
  followUpRecommended: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
