const fetch = require('node-fetch');

const { TELEGRAM_BOT_ID, TELEGRAM_CHAT_ID } = process.env;

module.exports = async (msg) => {
  if (!TELEGRAM_BOT_ID) {
    console.warn('TELEGRAM_BOT_ID should be defined!');
    return false;
  }
  if (!TELEGRAM_CHAT_ID) {
    console.warn('TELEGRAM_CHAT_ID should be defined!');
    return false;
  }
  if (!msg) {
    return false;
  }
  const encodedMsg = encodeURIComponent(msg);
  try {
    const URL = `https://api.telegram.org/bot${TELEGRAM_BOT_ID}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMsg}`;
    const data = await fetch(URL, { method: 'POST' }).then((response) => response.json());
    if (data.ok) {
      return true;
    }
    console.error('Send to Telegram failed:', data.error_code, data.description);
    return false;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};
