const mongoose = require('mongoose');

const labBookingSchema = new mongoose.Schema({
  bookingNumber: { type: String, required: true, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  laboratory: { type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory' },
  tests: [{
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' },
    name: String,
    price: Number
  }],
  collectionType: { type: String, enum: ['Home Sample Collection', 'Lab Visit'], default: 'Home Sample Collection' },
  scheduledDate: { type: Date, required: true },
  timeSlot: String,
  collectionAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Paid' },
  paymentId: String,
  status: { 
    type: String, 
    enum: ['Booked', 'Sample Collector Assigned', 'Sample Collected', 'In Lab Processing', 'Report Ready', 'Delivered', 'Cancelled'], 
    default: 'Booked' 
  },
  reportUrl: String,
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalReport' }
}, { timestamps: true });

module.exports = mongoose.model('LabBooking', labBookingSchema);
