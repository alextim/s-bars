const fetch = require('node-fetch');

const { TELEGRAM_TO, TELEGRAM_TOKEN } = process.env;

module.exports = async (msg) => {
  if (!TELEGRAM_TOKEN) {
    console.warn('TELEGRAM_TOKEN should be defined!');
    return false;
  }
  if (!TELEGRAM_TO) {
    console.warn('TELEGRAM_TO should be defined!');
    return false;
  }
  if (!msg) {
    return false;
  }
  const encodedMsg = encodeURIComponent(msg);
  try {
    const URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_TO}&text=${encodedMsg}`;
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
