const sgMail = require('@sendgrid/mail');
const emailValidator = require('email-validator');

const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL, URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const {
  EMAIL_FIELD,
  NAME_PATTERN,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  MESSAGE_MAX_LENGTH,
} = require('../src/lib/contact-form-validators');

const utils = require('./src/utils/helpers');

const validateOrigin = (event) => !event.headers.origin || event.headers.origin === URL;
const isSpam = (body) => body.email;

const sanitizeField = (x, minLength, maxLength) => {
  if (!x) {
    return false;
  }
  const val = x.trim();
  const n = val.length;
  if (n < minLength || n > maxLength) {
    return false;
  }
  const sanitized = utils.sanitizeHtml(val);
  return sanitized.length < minLength ? false : sanitized;
};

const sanitizeEmail = (val) => {
  const sanitized = sanitizeField(val, EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH);
  return sanitized && emailValidator.validate(sanitized) ? sanitized.toLowerCase() : false;
};

const sanitizeName = (val) => {
  const sanitized = sanitizeField(val, NAME_MIN_LENGTH, NAME_MAX_LENGTH);
  return sanitized && new RegExp(NAME_PATTERN).exec(sanitized) ? sanitized : false;
};

const sanitizeMessage = (val) => sanitizeField(val, MESSAGE_MIN_LENGTH, MESSAGE_MAX_LENGTH);

const sanitize = (body) => {
  const name = sanitizeName(body.name);
  if (!name) {
    return false;
  }
  const email = sanitizeEmail(body[EMAIL_FIELD]);
  if (!email) {
    return false;
  }
  const message = sanitizeMessage(body.message);
  if (!message) {
    return false;
  }
  return { name, email, message };
};

exports.handler = async (event) => {
  if (!validateOrigin(event)) {
    return { statusCode: 401, body: 'Bad origin' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } };
  }

  if (!SENDGRID_API_KEY || !SENDGRID_TO_EMAIL) {
    return {
      statusCode: 500,
      body: 'process.env.{vars} must be defined',
    };
  }

  if (!event.body) {
    return { statusCode: 400, body: 'Bad data' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Bad data' };
  }

  if (isSpam(body)) {
    return { statusCode: 403, body: 'Forbidden' };
  }

  const sanitized = sanitize(body);
  if (!sanitized) {
    return { statusCode: 400, body: 'Bad data' };
  }

  const aBody = Object.keys(sanitized).map((k) => {
    return `${k}: ${sanitized[k]}`;
  });

  const html = aBody.join('<br><br>');
  const text = aBody.join('\n\n');

  const msg = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_TO_EMAIL,
    subject: 'Contact Form Submission',
    text,
    html,
  };
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
