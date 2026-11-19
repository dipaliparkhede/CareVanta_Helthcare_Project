const express = require('express');
const router = express.Router();
const { getEcosystemStats, getPendingVerifications, getAuditLogs } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/stats', protect, authorize('super_admin'), getEcosystemStats);
router.get('/pending-verifications', protect, authorize('super_admin'), getPendingVerifications);
router.get('/audit-logs', protect, authorize('super_admin'), getAuditLogs);

module.exports = router;
