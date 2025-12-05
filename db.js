// db.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pujo_qr';

function connectDB() {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });

  mongoose.connection.on('error', err => {
    console.error('MongoDB error', err);
  });
}

module.exports = { connectDB };