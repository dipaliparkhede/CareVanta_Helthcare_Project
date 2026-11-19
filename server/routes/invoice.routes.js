const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/auth');

router.get('/', protect, asyncHandler(async (req, res) => {
  const items = await Invoice.find().limit(50);
  res.json({ success: true, count: items.length, items });
}));

router.get('/:id', protect, asyncHandler(async (req, res) => {
  const item = await Invoice.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Resource not found' });
  res.json({ success: true, item });
}));

module.exports = router;
