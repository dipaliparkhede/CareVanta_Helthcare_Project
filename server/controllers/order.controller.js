const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');
const { generateUniqueId } = require('../utils/helpers');

// Checkout & Create Order
const createOrder = asyncHandler(async (req, res) => {
  const { deliveryAddress, paymentMethod, prescriptionUrl } = req.body;

  const cart = await Cart.findOne({ user: req.user.id }).populate('items.medicine');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty.' });
  }

  const orderItems = cart.items.map(item => ({
    medicine: item.medicine._id,
    name: item.medicine.name,
    quantity: item.quantity,
    price: item.medicine.price,
    total: item.medicine.price * item.quantity
  }));

  const subtotal = orderItems.reduce((acc, i) => acc + i.total, 0);
  const deliveryCharges = subtotal > 500 ? 0 : 50;
  const totalAmount = subtotal + deliveryCharges;
  const orderNumber = generateUniqueId('ORD');

  const requiresPrescription = cart.items.some(item => item.medicine.prescriptionRequired);

  const order = await Order.create({
    orderNumber,
    user: req.user.id,
    items: orderItems,
    subtotal,
    deliveryCharges,
    totalAmount,
    deliveryAddress,
    paymentMethod: paymentMethod || 'Razorpay',
    paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Completed',
    prescriptionRequired: requiresPrescription,
    prescriptionUrl: prescriptionUrl || null,
    prescriptionVerificationStatus: requiresPrescription ? 'Pending Verification' : 'Not Required',
    orderStatus: requiresPrescription ? 'Prescription Verification' : 'Confirmed',
    trackingNumber: `TRK-${Date.now().toString().slice(-8)}`
  });

  // Empty user cart
  cart.items = [];
  await cart.save();

  // Notification
  await Notification.create({
    recipient: req.user.id,
    title: 'Pharmacy Order Placed',
    message: `Your pharmacy order #${orderNumber} for Rs. ${totalAmount} has been placed.`,
    category: 'Pharmacy Order',
    actionLink: '/patient/orders'
  });

  res.status(201).json({
    success: true,
    message: 'Order created successfully.',
    order
  });
});

// Patient Orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, count: orders.length, orders });
});

// Pharmacist: All Orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'firstName lastName email phone').sort({ createdAt: -1 });
  res.json({ success: true, count: orders.length, orders });
});

// Pharmacist: Update Order Status / Verify Prescription
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, prescriptionVerificationStatus } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

  if (orderStatus) order.orderStatus = orderStatus;
  if (prescriptionVerificationStatus) order.prescriptionVerificationStatus = prescriptionVerificationStatus;

  await order.save();
  res.json({ success: true, message: 'Order updated.', order });
});

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
