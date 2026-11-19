const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userEmail: String,
  role: String,
  action: { type: String, required: true }, // e.g. "USER_LOGIN", "REPORT_GENERATED", "PRESCRIPTION_FINALIZED"
  resource: String,
  ipAddress: String,
  userAgent: String,
  details: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
