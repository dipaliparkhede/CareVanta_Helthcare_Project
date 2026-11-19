const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
} = require('../controllers/appointment.controller');
const { protect, authorize } = require('../middleware/auth');

router.post('/book', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.get('/doctor-appointments', protect, authorize('doctor'), getDoctorAppointments);
router.patch('/:id/status', protect, updateAppointmentStatus);

module.exports = router;
