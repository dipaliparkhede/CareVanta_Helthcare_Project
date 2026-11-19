const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, trim: true },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'pharmacist', 'lab_admin', 'hospital_admin', 'super_admin'], 
    default: 'patient' 
  },
  avatar: { type: String, default: '' },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'] },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  otpCode: String,
  otpExpires: Date,
  lastLogin: Date,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  addresses: [{
    type: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false }
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema);
