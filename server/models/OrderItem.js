const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);
