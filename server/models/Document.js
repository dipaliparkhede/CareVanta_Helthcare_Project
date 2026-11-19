const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Prescriptions', 'Blood Reports', 'X-Rays', 'Scan Reports', 'Medical Certificates', 'Discharge Summaries', 'Consultation Reports', 'Insurance Documents', 'Payment Receipts', 'Pharmacy Invoices', 'Lab Reports', 'Other Historical Documents'], 
    default: 'Other Historical Documents' 
  },
  fileUrl: { type: String, required: true },
  fileName: String,
  fileSize: Number, // in bytes
  fileType: String, // 'application/pdf', 'image/png', etc.
  description: String,
  associatedAppointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  associatedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  isPrivate: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
