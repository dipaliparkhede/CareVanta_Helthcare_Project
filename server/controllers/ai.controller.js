const asyncHandler = require('../utils/asyncHandler');
const {
  getSymptomGuidance,
  answerHealthQuestion,
  analyzeMedicalReportAI,
  parsePrescriptionOCR
} = require('../services/ai/aiService');

// AI Symptom Guidance
const checkSymptoms = asyncHandler(async (req, res) => {
  const { symptoms, age, gender, durationDays, language } = req.body;
  if (!symptoms || !symptoms.length) {
    return res.status(400).json({ success: false, message: 'Please describe at least one symptom.' });
  }

  const result = await getSymptomGuidance({ symptoms, age, gender, durationDays, language });
  res.json({ success: true, result });
});

// AI Health Q&A Chatbot
const chatWithAI = asyncHandler(async (req, res) => {
  const { query, conversationHistory, language } = req.body;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query cannot be empty.' });
  }

  const result = await answerHealthQuestion({ query, conversationHistory, language });
  res.json({ success: true, result });
});

// AI Report Analyzer
const analyzeReport = asyncHandler(async (req, res) => {
  const { reportText, parameters, language } = req.body;
  const analysis = await analyzeMedicalReportAI({ reportText, parameters, language });
  res.json({ success: true, analysis });
});

// AI OCR Prescription Reader
const processPrescriptionOCR = asyncHandler(async (req, res) => {
  const { imageUrl, rawText } = req.body;
  const ocrData = await parsePrescriptionOCR({ imageUrl, rawText });
  res.json({ success: true, ocrData });
});

module.exports = {
  checkSymptoms,
  chatWithAI,
  analyzeReport,
  processPrescriptionOCR
};
