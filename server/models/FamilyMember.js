const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  primaryUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  relationship: { type: String, enum: ['Spouse', 'Child', 'Parent', 'Sibling', 'Grandparent', 'Other'], required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: Date,
  bloodGroup: String,
  knownAllergies: [String],
  existingConditions: [String]
}, { timestamps: true });

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
