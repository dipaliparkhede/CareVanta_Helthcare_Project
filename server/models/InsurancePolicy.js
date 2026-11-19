const mongoose = require('mongoose');

const insurancePolicySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policyNumber: { type: String, required: true },
  providerName: { type: String, required: true },
  planName: String,
  sumInsured: Number,
  validFrom: Date,
  validTo: Date,
  documentUrl: String,
  status: { type: String, enum: ['Active', 'Expired', 'Claim in Process'], default: 'Active' },
  beneficiaries: [String]
}, { timestamps: true });

module.exports = mongoose.model('InsurancePolicy', insurancePolicySchema);
