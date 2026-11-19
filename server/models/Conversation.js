const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  consultation: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' },
  lastMessage: String,
  lastMessageAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
