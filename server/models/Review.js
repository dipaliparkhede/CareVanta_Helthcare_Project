const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['Doctor', 'Hospital', 'Pharmacy', 'Laboratory', 'Medicine'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  verifiedBooking: { type: Boolean, default: true },
  isModerated: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
