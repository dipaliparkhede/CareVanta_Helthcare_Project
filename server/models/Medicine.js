const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true },
  manufacturer: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineCategory' },
  categoryName: { type: String, default: 'General Wellness' },
  description: String,
  composition: String,
  dosageForm: { type: String, enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Powder', 'Device'], default: 'Tablet' },
  strength: String, // e.g. 500mg
  packSize: String, // e.g. 10 Tablets per strip
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  prescriptionRequired: { type: Boolean, default: false },
  stockQuantity: { type: Number, default: 100 },
  expiryDate: Date,
  batchNumber: String,
  image: { type: String, default: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500' },
  rating: { type: Number, default: 4.6 },
  totalReviews: { type: Number, default: 0 },
  sideEffects: [String],
  usageInstructions: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
