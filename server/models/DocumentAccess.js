const mongoose = require('mongoose');

const documentAccessSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWithUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accessKey: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  isRevoked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('DocumentAccess', documentAccessSchema);
