const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    name: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  subtotal: { type: Number, required: true },
  deliveryCharges: { type: Number, default: 50 },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  deliveryAddress: {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  prescriptionRequired: { type: Boolean, default: false },
  prescriptionUrl: String,
  prescriptionVerificationStatus: { 
    type: String, 
    enum: ['Not Required', 'Pending Verification', 'Approved', 'Rejected'], 
    default: 'Not Required' 
  },
  paymentMethod: { type: String, enum: ['Razorpay', 'COD', 'Card', 'UPI'], default: 'Razorpay' },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' },
  paymentId: String,
  orderStatus: { 
    type: String, 
    enum: ['Pending', 'Payment Processing', 'Confirmed', 'Prescription Verification', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refund Initiated', 'Refunded'], 
    default: 'Confirmed' 
  },
  trackingNumber: String,
  invoiceUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
