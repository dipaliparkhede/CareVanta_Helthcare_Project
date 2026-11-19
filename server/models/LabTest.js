const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  category: { type: String, default: 'General Diagnostics' },
  description: String,
  sampleType: { type: String, default: 'Blood' }, // Blood, Urine, Saliva, Swab
  fastingRequired: { type: Boolean, default: false },
  tatHours: { type: Number, default: 24 }, // Turnaround time in hours
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  homeCollectionAvailable: { type: Boolean, default: true },
  laboratory: { type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory' },
  parametersIncluded: [String],
  image: { type: String, default: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500' },
  rating: { type: Number, default: 4.8 }
}, { timestamps: true });

module.exports = mongoose.model('LabTest', labTestSchema);
