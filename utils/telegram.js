// utils/telegram.js
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendPhotoToTelegram(filePath, caption='') {
  if (!BOT_TOKEN || !CHAT_ID) {
    return { ok: false, error: 'Telegram not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env' };
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
  try {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('caption', caption);
    form.append('photo', fs.createReadStream(filePath));

    const headers = form.getHeaders();
    const resp = await axios.post(url, form, { headers, maxContentLength: Infinity, maxBodyLength: Infinity, timeout: 30000 });
    return resp.data;
  } catch (err) {
    console.error('telegram error', err?.response?.data || err.message);
    return { ok: false, error: err?.response?.data || err.message };
  }
}

module.exports = { sendPhotoToTelegram };