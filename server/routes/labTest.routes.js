const express = require('express');
const router = express.Router();
const { getLabTests, bookLabTest, getMyLabBookings } = require('../controllers/labTest.controller');
const { protect } = require('../middleware/auth');

router.get('/', getLabTests);
router.post('/book', protect, bookLabTest);
router.get('/my-bookings', protect, getMyLabBookings);

module.exports = router;
