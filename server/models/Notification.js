const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Appointment', 'Prescription', 'Medical Report', 'Pharmacy Order', 'Lab Booking', 'Medicine Reminder', 'Security', 'System'], 
    default: 'System' 
  },
  actionLink: String,
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
