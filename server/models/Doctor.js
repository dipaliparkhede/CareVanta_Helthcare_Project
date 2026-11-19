const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specialization: { type: String, required: true },
  qualifications: [String],
  registrationNumber: { type: String, required: true, unique: true },
  experienceYears: { type: Number, default: 0 },
  consultationFee: { type: Number, required: true, default: 500 },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  bio: String,
  languages: [String],
  rating: { type: Number, default: 4.8 },
  totalReviews: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: true },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'verified' },
  availableDays: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
  availableTimeSlots: [{
    startTime: String, // '09:00'
    endTime: String,   // '13:00'
    slotDurationMinutes: { type: Number, default: 30 }
  }],
  videoConsultationEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
