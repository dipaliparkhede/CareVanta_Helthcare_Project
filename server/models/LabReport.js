const mongoose = require('mongoose');

const labReportSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'LabBooking', required: true },
  laboratory: { type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testName: String,
  collectedAt: Date,
  reportedAt: { type: Date, default: Date.now },
  pathologistName: String,
  pathologistRegNo: String,
  pdfUrl: String,
  status: { type: String, enum: ['Preliminary', 'Final', 'Corrected'], default: 'Final' }
}, { timestamps: true });

module.exports = mongoose.model('LabReport', labReportSchema);
