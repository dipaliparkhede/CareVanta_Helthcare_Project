const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, clearCart } = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/item', protect, updateCartItem);
router.delete('/clear', protect, clearCart);

module.exports = router;
