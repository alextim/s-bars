const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (msg) => {
  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: 'ok',
    };
  } catch (err) {
    console.error(err);
    if (err.response) {
      console.error(err.response.body);
    }
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
