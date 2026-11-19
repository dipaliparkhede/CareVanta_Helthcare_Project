const express = require('express');
const router = express.Router();
const { uploadDocument, getMyDocuments, deleteDocument } = require('../controllers/document.controller');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.post('/upload', protect, upload.single('file'), uploadDocument);
router.get('/my-documents', protect, getMyDocuments);
router.delete('/:id', protect, deleteDocument);

module.exports = router;
