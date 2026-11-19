const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, updateAvailability, getDoctorStats } = require('../controllers/doctor.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getDoctors);
router.get('/stats', protect, authorize('doctor'), getDoctorStats);
router.get('/:id', getDoctorById);
router.put('/availability', protect, authorize('doctor'), updateAvailability);

module.exports = router;
