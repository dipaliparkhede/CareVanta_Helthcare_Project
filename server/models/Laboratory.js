const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  licenseNumber: { type: String, required: true, unique: true },
  nablAccredited: { type: Boolean, default: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  phone: String,
  email: String,
  homeSampleCollection: { type: Boolean, default: true },
  rating: { type: Number, default: 4.9 },
  isVerified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Laboratory', laboratorySchema);
