const mongoose = require('mongoose');

const reportVersionSchema = new mongoose.Schema({
  report: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalReport', required: true },
  versionNumber: { type: Number, required: true },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changeReason: String,
  snapshotData: mongoose.Schema.Types.Mixed,
  pdfUrl: String
}, { timestamps: true });

module.exports = mongoose.model('ReportVersion', reportVersionSchema);
