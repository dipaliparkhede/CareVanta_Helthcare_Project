const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recordType: { 
    type: String, 
    enum: ['Prescription', 'Lab Report', 'Discharge Summary', 'Vaccination', 'Imaging', 'Consultation Note', 'Other'], 
    default: 'Other' 
  },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  doctorName: String,
  facilityName: String,
  summary: String,
  fileUrl: String,
  fileType: String,
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
