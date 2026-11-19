require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(mongoSanitize());
app.use(hpp());
app.use(compression());

// Parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static Uploads Serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    platform: 'CareVanta AI Master Healthcare Ecosystem',
    status: 'ONLINE',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/doctors', require('./routes/doctor.routes'));
app.use('/api/appointments', require('./routes/appointment.routes'));
app.use('/api/medicines', require('./routes/medicine.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/medical-reports', require('./routes/medicalReport.routes'));
app.use('/api/prescriptions', require('./routes/prescription.routes'));
app.use('/api/documents', require('./routes/document.routes'));
app.use('/api/lab-tests', require('./routes/labTest.routes'));
app.use('/api/ai', require('./routes/ai.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// Auxiliary Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/patients', require('./routes/patient.routes'));
app.use('/api/consultations', require('./routes/consultation.routes'));
app.use('/api/payments', require('./routes/payment.routes'));
app.use('/api/medical-records', require('./routes/medicalRecord.routes'));
app.use('/api/lab-bookings', require('./routes/labBooking.routes'));
app.use('/api/hospitals', require('./routes/hospital.routes'));
app.use('/api/pharmacies', require('./routes/pharmacy.routes'));
app.use('/api/laboratories', require('./routes/laboratory.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/family', require('./routes/family.routes'));
app.use('/api/reviews', require('./routes/review.routes'));
app.use('/api/health-packages', require('./routes/healthPackage.routes'));
app.use('/api/insurance', require('./routes/insurance.routes'));
app.use('/api/support', require('./routes/support.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/invoices', require('./routes/invoice.routes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found.` });
});

// Central Error Handler
app.use(errorHandler);

module.exports = app;
