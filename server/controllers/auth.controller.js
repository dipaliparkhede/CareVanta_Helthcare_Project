const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Pharmacy = require('../models/Pharmacy');
const Laboratory = require('../models/Laboratory');
const Hospital = require('../models/Hospital');
const AuditLog = require('../models/AuditLog');
const asyncHandler = require('../utils/asyncHandler');
const { generateToken, generateRefreshToken } = require('../utils/helpers');

// Register User (Handles Patient, Doctor, Pharmacist, Lab Admin, Hospital Admin)
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, role, professionalDetails } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User with this email already exists.' });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    role: role || 'patient',
    isVerified: role === 'patient' // non-patients go through verification workflow
  });

  // Create role-specific entity
  if (user.role === 'patient') {
    await Patient.create({ user: user._id });
  } else if (user.role === 'doctor') {
    await Doctor.create({
      user: user._id,
      specialization: professionalDetails?.specialization || 'General Physician',
      registrationNumber: professionalDetails?.registrationNumber || `REG-${Date.now().toString().slice(-6)}`,
      consultationFee: professionalDetails?.consultationFee || 500,
      experienceYears: professionalDetails?.experienceYears || 5,
      isVerified: true // auto-approved for test/demo
    });
  } else if (user.role === 'pharmacist') {
    await Pharmacy.create({
      name: professionalDetails?.pharmacyName || `${user.firstName}'s Care Pharmacy`,
      adminUser: user._id,
      licenseNumber: professionalDetails?.licenseNumber || `PHARM-${Date.now().toString().slice(-6)}`,
      phone: user.phone || '9876543210'
    });
  } else if (user.role === 'lab_admin') {
    await Laboratory.create({
      name: professionalDetails?.labName || `${user.firstName}'s Diagnostic Lab`,
      adminUser: user._id,
      licenseNumber: professionalDetails?.licenseNumber || `LAB-${Date.now().toString().slice(-6)}`,
      phone: user.phone || '9876543210'
    });
  } else if (user.role === 'hospital_admin') {
    await Hospital.create({
      name: professionalDetails?.hospitalName || `${user.firstName} Memorial Hospital`,
      adminUser: user._id,
      registrationNumber: professionalDetails?.registrationNumber || `HOSP-${Date.now().toString().slice(-6)}`,
      phone: user.phone || '9876543210'
    });
  }

  // Audit Log
  await AuditLog.create({
    user: user._id,
    userEmail: user.email,
    role: user.role,
    action: 'USER_REGISTERED',
    resource: 'AUTH'
  });

  const token = generateToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Registration successful.',
    token,
    refreshToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isVerified: user.isVerified
    }
  });
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: 'Your account has been deactivated.' });
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  await AuditLog.create({
    user: user._id,
    userEmail: user.email,
    role: user.role,
    action: 'USER_LOGIN',
    resource: 'AUTH'
  });

  const token = generateToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  res.json({
    success: true,
    token,
    refreshToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      isVerified: user.isVerified
    }
  });
});

// Get Current User Profile
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  let profileDetails = null;

  if (user.role === 'doctor') {
    profileDetails = await Doctor.findOne({ user: user._id });
  } else if (user.role === 'patient') {
    profileDetails = await Patient.findOne({ user: user._id });
  } else if (user.role === 'pharmacist') {
    profileDetails = await Pharmacy.findOne({ adminUser: user._id });
  } else if (user.role === 'lab_admin') {
    profileDetails = await Laboratory.findOne({ adminUser: user._id });
  } else if (user.role === 'hospital_admin') {
    profileDetails = await Hospital.findOne({ adminUser: user._id });
  }

  res.json({
    success: true,
    user,
    profileDetails
  });
});

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, gender, dateOfBirth, bloodGroup, emergencyContact, addresses } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, phone, gender, dateOfBirth, bloodGroup, emergencyContact, addresses },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Profile updated successfully.',
    user
  });
});

module.exports = { register, login, getMe, updateProfile };
