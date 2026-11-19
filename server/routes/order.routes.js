const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/order.controller');
const { protect, authorize } = require('../middleware/auth');

router.post('/create', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/all-orders', protect, authorize('pharmacist', 'super_admin'), getAllOrders);
router.patch('/:id/status', protect, authorize('pharmacist', 'super_admin'), updateOrderStatus);

module.exports = router;
