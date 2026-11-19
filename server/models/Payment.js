const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentType: { 
    type: String, 
    enum: ['Appointment Consultation', 'Online Pharmacy Order', 'Laboratory Diagnostic Test', 'Health Package Subscription', 'Hospital Admission'], 
    required: true 
  },
  referenceId: String, // ID of order, appointment, or lab booking
  paymentMethod: { type: String, default: 'Razorpay' },
  status: { type: String, enum: ['Created', 'Success', 'Failed', 'Refunded'], default: 'Created' },
  failureReason: String,
  invoiceUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
