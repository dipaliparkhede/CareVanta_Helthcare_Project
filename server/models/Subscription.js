const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineName: { type: String, required: true },
  dosage: String, // '1 tablet'
  frequency: { type: String, enum: ['Once daily', 'Twice daily', 'Thrice daily', 'Every 8 hours', 'Custom'], default: 'Twice daily' },
  reminderTimes: [String], // ['09:00 AM', '09:00 PM']
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  instructions: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
