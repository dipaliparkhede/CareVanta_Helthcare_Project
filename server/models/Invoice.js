const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Pharmacy', 'Consultation', 'Laboratory', 'Hospital', 'Health Package'], required: true },
  referenceId: String,
  itemizedServices: [{
    description: String,
    quantity: { type: Number, default: 1 },
    unitPrice: Number,
    total: Number
  }],
  subtotal: { type: Number, required: true },
  taxGst: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Refunded'], default: 'Paid' },
  paymentTransactionId: String,
  pdfUrl: String,
  issuedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
