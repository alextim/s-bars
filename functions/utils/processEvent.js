const urlAPI = require('url');
const emailValidator = require('email-validator');

const {
  SENDGRID_API_KEY,
  SENDGRID_SINGE_SENDER,
  TO_EMAIL,
  URL,
  SITE_NAME,
  DEPLOY_URL,
} = process.env;
const { sanitizeField, validateField } = require('./field-utils');

const getDomainName = (s) => s.replace(/^[^.]+\./g, '');

const getDeployDomainName = () => {
  const { hostname } = urlAPI.parse(DEPLOY_URL);
  const domainName = getDomainName(hostname);
  return domainName;
};

const validateOrigin = (event) => {
  if (!event.headers.origin) {
    return true;
  }

  if (event.headers.origin === URL) {
    return true;
  }

  const { hostname } = urlAPI.parse(event.headers.origin.toString());
  const domainName = getDomainName(hostname);

  const deployDomainName = getDeployDomainName();
  if (domainName !== deployDomainName) {
    return false;
  }

  const [name] = hostname.split('.');
  return name === SITE_NAME;
};

const isSpam = (body) => body.email;

const getSanitizedValues = (body, fields) => {
  const keys = Object.keys(fields);
  const n = keys.length;
  const result = {};
  for (let i = 0; i < n; i++) {
    const key = keys[i];
    const fieldInfo = fields[key];
    const value = body[key];
    if (!validateField(value, fieldInfo)) {
      return false;
    }
    result[key] = sanitizeField(value);
  }
  return result;
};

const processEvent = async (event, sgMail, fields, subject) => {
  // console.warn(event.headers.origin, URL);
  if (!validateOrigin(event)) {
    return { statusCode: 401, body: 'Bad origin' };
    // return { statusCode: 401, body: `Bad origin ${event.headers.origin} ${URL}` };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } };
  }

  if (!SENDGRID_API_KEY) {
    return {
      statusCode: 500,
      body: 'SENDGRID_API_KEY must be defined',
    };
  }
  if (!emailValidator.validate(SENDGRID_SINGE_SENDER)) {
    return {
      statusCode: 500,
      body: `SENDGRID_SINGE_SENDER {${SENDGRID_SINGE_SENDER}} not valid email address`,
    };
  }
  if (!emailValidator.validate(TO_EMAIL)) {
    return {
      statusCode: 500,
      body: `TO_EMAIL {${TO_EMAIL}} not valid email address`,
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

  const sanitized = getSanitizedValues(body, fields);
  if (!sanitized) {
    return { statusCode: 400, body: 'Bad data' };
  }

  const aBody = Object.keys(sanitized).map((k) => {
    const name = (fields[k] ? fields[k].humanName : undefined) || k;
    return `${name}: ${sanitized[k]}`;
  });

  aBody.splice(0, 0, URL, '-'.repeat(20));
  const html = aBody.join('<br><br>');
  const text = aBody.join('\n\n');

  const msg = {
    to: TO_EMAIL,
    from: SENDGRID_SINGE_SENDER,
    subject: `${SITE_NAME}: ${subject}`,
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

module.exports = processEvent;
