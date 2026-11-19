const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  refundNumber: { type: String, required: true, unique: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  razorpayRefundId: String,
  status: { type: String, enum: ['Requested', 'Processing', 'Processed', 'Failed'], default: 'Processing' },
  processedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Refund', refundSchema);
