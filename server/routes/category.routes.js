const express = require('express');
const router = express.Router();
const MedicineCategory = require('../models/MedicineCategory');
const asyncHandler = require('../utils/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
  const categories = await MedicineCategory.find({ isActive: true });
  res.json({ success: true, count: categories.length, categories });
}));

module.exports = router;
