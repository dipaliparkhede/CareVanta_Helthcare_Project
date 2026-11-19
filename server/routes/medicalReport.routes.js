const express = require('express');
const router = express.Router();
const { createMedicalReport, getMyReports, verifyReportByCode } = require('../controllers/medicalReport.controller');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, createMedicalReport);
router.get('/my-reports', protect, getMyReports);
router.get('/verify/:code', verifyReportByCode);

module.exports = router;
