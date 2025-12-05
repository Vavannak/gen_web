// routes/qr.js
const express = require('express');
const router = express.Router();
const { generateBasic, generateAdvanced, sendToTelegram, listQRs } = require('../controllers/qrController');

// POST /api/qr/basic -> { url }
router.post('/basic', generateBasic);

// POST /api/qr/advanced -> { url, watermarkText? }
router.post('/advanced', generateAdvanced);

// POST /api/qr/send -> { filename, caption? }
router.post('/send', sendToTelegram);

// GET /api/qr/list
router.get('/list', listQRs);

module.exports = router;