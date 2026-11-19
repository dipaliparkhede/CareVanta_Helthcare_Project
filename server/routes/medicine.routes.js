const express = require('express');
const router = express.Router();
const { getMedicines, getMedicineById, createMedicine, updateMedicine } = require('../controllers/medicine.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getMedicines);
router.get('/:id', getMedicineById);
router.post('/', protect, authorize('pharmacist', 'super_admin'), createMedicine);
router.put('/:id', protect, authorize('pharmacist', 'super_admin'), updateMedicine);

module.exports = router;
