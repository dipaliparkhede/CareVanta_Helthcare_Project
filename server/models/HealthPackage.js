const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  targetAudience: String, // e.g. "Men 40+", "Women Wellness", "Senior Citizens"
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  includedTests: [String],
  totalTestsCount: { type: Number, default: 10 },
  consultationsIncluded: [String], // e.g. "1 General Physician Consultation, 1 Dietitian Consultation"
  image: { type: String, default: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500' },
  isPopular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('HealthPackage', healthPackageSchema);
