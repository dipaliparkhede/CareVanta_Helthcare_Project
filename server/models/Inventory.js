const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  batchNumber: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  costPrice: Number,
  sellingPrice: Number,
  expiryDate: Date,
  lowStockThreshold: { type: Number, default: 20 },
  reorderStatus: { type: String, enum: ['Normal', 'Low Stock', 'Out of Stock'], default: 'Normal' }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
