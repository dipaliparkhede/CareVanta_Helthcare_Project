const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema({
  reportNumber: { type: String, required: true, unique: true },
  reportType: { 
    type: String, 
    enum: [
      'Doctor Consultation Report',
      'Digital Medical Prescription',
      'Blood Test Report',
      'Urine Test Report',
      'Complete Blood Count (CBC) Report',
      'Diabetes (HbA1c) Report',
      'Thyroid Profile Report',
      'Lipid Profile Report',
      'Kidney Function Test (KFT) Report',
      'Liver Function Test (LFT) Report',
      'X-Ray Diagnostic Report',
      'MRI Scan Report',
      'CT Scan Report',
      'Ultrasound Scan Report',
      'Full Body Checkup Report',
      'Patient Medical History Report',
      'Hospital Admission Report',
      'Hospital Discharge Summary',
      'Treatment Summary Report',
      'Follow-Up Consultation Report',
      'Pharmacy Tax Invoice',
      'Appointment Confirmation Receipt',
      'Payment Transaction Invoice',
      'Refund Settlement Receipt',
      'Health Package Comprehensive Report',
      'Family Health Consolidated Report',
      'AI-Generated Clinical Explanation'
    ], 
    required: true 
  },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  laboratory: { type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory' },
  testOrConsultationDate: { type: Date, default: Date.now },
  reportGenerationDate: { type: Date, default: Date.now },
  category: { type: String, enum: ['Clinical', 'Diagnostic', 'Radiology', 'Administrative', 'Pharmacy', 'AI Analysis'], default: 'Diagnostic' },
  parameters: [{
    parameterName: String,
    measuredValue: String,
    unit: String,
    referenceRange: String,
    interpretation: { type: String, enum: ['Normal', 'High', 'Low', 'Abnormal', 'Pending'], default: 'Normal' }
  }],
  clinicalObservations: String,
  doctorComments: String,
  recommendations: String,
  verificationCode: { type: String, required: true, unique: true },
  qrCodeUrl: String,
  pdfUrl: String,
  version: { type: Number, default: 1 },
  isFinalized: { type: Boolean, default: true },
  status: { type: String, enum: ['Draft', 'Finalized', 'Amended', 'Cancelled'], default: 'Finalized' }
}, { timestamps: true });

module.exports = mongoose.model('MedicalReport', medicalReportSchema);
