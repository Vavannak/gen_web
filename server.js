// server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const { connectDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// connect to DB
connectDB();

// middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
const qrRoutes = require('./routes/qr');
app.use('/api/qr', qrRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));