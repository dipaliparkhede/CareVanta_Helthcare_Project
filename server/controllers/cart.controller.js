const Cart = require('../models/Cart');
const Medicine = require('../models/Medicine');
const asyncHandler = require('../utils/asyncHandler');

// Get User Cart
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.medicine');
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.medicine ? item.medicine.price * item.quantity : 0);
  }, 0);

  const requiresPrescription = cart.items.some(item => item.medicine && item.medicine.prescriptionRequired);

  res.json({
    success: true,
    cart,
    subtotal,
    deliveryCharges: subtotal > 500 || subtotal === 0 ? 0 : 50,
    grandTotal: subtotal > 500 ? subtotal : (subtotal === 0 ? 0 : subtotal + 50),
    requiresPrescription
  });
});

// Add Item to Cart
const addToCart = asyncHandler(async (req, res) => {
  const { medicineId, quantity = 1 } = req.body;
  const medicine = await Medicine.findById(medicineId);
  if (!medicine) {
    return res.status(404).json({ success: false, message: 'Medicine not found.' });
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(item => item.medicine.toString() === medicineId);
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += Number(quantity);
  } else {
    cart.items.push({
      medicine: medicineId,
      quantity: Number(quantity),
      price: medicine.price
    });
  }

  await cart.save();
  res.json({ success: true, message: 'Added to cart.', cart });
});

// Update Quantity / Remove
const updateCartItem = asyncHandler(async (req, res) => {
  const { medicineId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ success: false, message: 'Cart not found.' });

  if (quantity <= 0) {
    cart.items = cart.items.filter(item => item.medicine.toString() !== medicineId);
  } else {
    const item = cart.items.find(item => item.medicine.toString() === medicineId);
    if (item) item.quantity = quantity;
  }

  await cart.save();
  res.json({ success: true, message: 'Cart updated.', cart });
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
  res.json({ success: true, message: 'Cart cleared.' });
});

module.exports = { getCart, addToCart, updateCartItem, clearCart };
