const Document = require('../models/Document');
const asyncHandler = require('../utils/asyncHandler');

// Upload Document to Locker
const uploadDocument = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: 'Please attach a document file.' });
  }

  const doc = await Document.create({
    user: req.user.id,
    title: title || file.originalname,
    category: category || 'Other Historical Documents',
    fileUrl: `/uploads/${file.filename}`,
    fileName: file.originalname,
    fileSize: file.size,
    fileType: file.mimetype,
    description
  });

  res.status(201).json({ success: true, message: 'Document safely stored in locker.', document: doc });
});

// Get User Documents
const getMyDocuments = asyncHandler(async (req, res) => {
  const { category } = req.query;
  let query = { user: req.user.id };
  if (category && category !== 'All') query.category = category;

  const documents = await Document.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: documents.length, documents });
});

// Delete Document
const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found.' });
  res.json({ success: true, message: 'Document deleted from medical locker.' });
});

module.exports = { uploadDocument, getMyDocuments, deleteDocument };
