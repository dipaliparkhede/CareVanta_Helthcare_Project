const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Appointment Issue', 'Pharmacy Order', 'Lab Report Delay', 'Payment & Refund', 'Technical Support', 'General Inquiry'], 
    default: 'General Inquiry' 
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    senderName: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
