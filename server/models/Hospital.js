const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  registrationNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Hospital', 'Clinic', 'Multi-Specialty', 'Diagnostic Center'], default: 'Hospital' },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  phone: String,
  email: String,
  website: String,
  rating: { type: Number, default: 4.5 },
  bedCapacity: { type: Number, default: 100 },
  availableBeds: { type: Number, default: 45 },
  emergencyServices: { type: Boolean, default: true },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  isVerified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
