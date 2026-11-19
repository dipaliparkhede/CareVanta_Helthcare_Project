const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  licenseNumber: { type: String, required: true, unique: true },
  gstNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  phone: String,
  email: String,
  is24x7: { type: Boolean, default: false },
  rating: { type: Number, default: 4.7 },
  isVerified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Pharmacy', pharmacySchema);
