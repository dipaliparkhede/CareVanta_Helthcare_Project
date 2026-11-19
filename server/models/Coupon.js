const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['Percentage', 'Flat'], default: 'Percentage' },
  discountValue: { type: Number, required: true },
  minimumOrderValue: { type: Number, default: 0 },
  maxDiscountAmount: Number,
  validUntil: Date,
  usageLimit: { type: Number, default: 1000 },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
