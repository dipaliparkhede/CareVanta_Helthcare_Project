const express = require('express');
const router = express.Router();
const { checkSymptoms, chatWithAI, analyzeReport, processPrescriptionOCR } = require('../controllers/ai.controller');
const { optionalAuth } = require('../middleware/auth');

router.post('/symptoms', optionalAuth, checkSymptoms);
router.post('/chat', optionalAuth, chatWithAI);
router.post('/analyze-report', optionalAuth, analyzeReport);
router.post('/ocr-prescription', optionalAuth, processPrescriptionOCR);

module.exports = router;
