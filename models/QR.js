// models/QR.js
const mongoose = require('mongoose');

const QRSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QR', QRSchema);