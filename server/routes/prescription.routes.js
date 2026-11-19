const express = require('express');
const router = express.Router();
const { createPrescription, getMyPrescriptions } = require('../controllers/prescription.controller');
const { protect, authorize } = require('../middleware/auth');

router.post('/create', protect, authorize('doctor'), createPrescription);
router.get('/my-prescriptions', protect, getMyPrescriptions);

module.exports = router;
