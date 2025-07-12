const express = require('express');
const router = express.Router();
const { sendEmails, getLogs, exportLogs } = require('../controllers/emailController');

router.post('/send-email', sendEmails);
router.get('/logs', getLogs);
router.get('/logs/export', exportLogs);

module.exports = router;
