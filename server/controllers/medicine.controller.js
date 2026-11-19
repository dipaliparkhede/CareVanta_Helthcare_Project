const Medicine = require('../models/Medicine');
const MedicineCategory = require('../models/MedicineCategory');
const asyncHandler = require('../utils/asyncHandler');
const { getPagination, paginateResponse } = require('../utils/helpers');

// Browse Medicine Catalog
const getMedicines = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice, prescriptionRequired } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  let query = { isActive: true };

  if (category && category !== 'All') {
    query.categoryName = new RegExp(category, 'i');
  }
  if (search) {
    query.$or = [
      { name: new RegExp(search, 'i') },
      { brand: new RegExp(search, 'i') },
      { composition: new RegExp(search, 'i') }
    ];
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (prescriptionRequired === 'true') {
    query.prescriptionRequired = true;
  }

  const medicines = await Medicine.find(query)
    .populate('category', 'name slug')
    .sort({ totalSold: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Medicine.countDocuments(query);

  res.json({
    success: true,
    ...paginateResponse(medicines, total, page, limit)
  });
});

// Medicine Details
const getMedicineById = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id).populate('category');
  if (!medicine) {
    return res.status(404).json({ success: false, message: 'Medicine product not found.' });
  }

  // Find generic alternatives
  const alternatives = await Medicine.find({
    composition: medicine.composition,
    _id: { $ne: medicine._id },
    isActive: true
  }).limit(4);

  res.json({ success: true, medicine, alternatives });
});

// Pharmacist: Create Medicine
const createMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.create(req.body);
  res.status(201).json({ success: true, message: 'Medicine added to catalog.', medicine });
});

// Pharmacist: Update Medicine Inventory
const updateMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!medicine) {
    return res.status(404).json({ success: false, message: 'Medicine not found.' });
  }
  res.json({ success: true, message: 'Medicine updated successfully.', medicine });
});

module.exports = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine
};
