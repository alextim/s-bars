const urlAPI = require('url');
const emailValidator = require('email-validator');

const sendEmail = require('./sendEmail');
const sendTelegram = require('./sendTelegram');
const { sanitizeField, validateField } = require('./field-utils');

const {
  SENDGRID_API_KEY,
  SENDGRID_SINGLE_SENDER,
  TO_EMAIL,
  URL,
  SITE_NAME,
  DEPLOY_URL,
} = process.env;

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

const sanitize = (body, fields) => {
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
    const sanitized = sanitizeField(value);
    if (sanitized) {
      result[key] = sanitized;
    }
  }
  return result;
};

const reorder = (o, body) => {
  const result = {};
  const keys = Object.keys(body);
  const n = keys.length;
  for (let i = 0; i < n; i++) {
    const key = keys[i];
    if (o[key]) {
      result[key] = o[key];
    }
  }
  return result;
};

module.exports = async (event, fields, subject) => {
  /**
   *  for Debug
   *  console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`);
   *  console.warn(event.headers.origin, URL);
   */
  if (!validateOrigin(event)) {
    return { statusCode: 401, body: 'Bad origin' };
    /**
     *  for Debug
     *  return { statusCode: 401, body: `Bad origin ${event.headers.origin} ${URL}` };
     */
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
  if (!emailValidator.validate(SENDGRID_SINGLE_SENDER)) {
    return {
      statusCode: 500,
      body: `SENDGRID_SINGE_SENDER {${SENDGRID_SINGLE_SENDER}} not valid email address`,
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

  const sanitized = sanitize(body, fields);
  if (!sanitized) {
    return { statusCode: 400, body: 'Bad data' };
  }

  const ordered = reorder(sanitized, body);

  const aBody = Object.keys(ordered).map((key) => {
    const name = (fields[key] ? fields[key].humanName : undefined) || key;
    return `${name}: ${ordered[key]}`;
  });

  // aBody.push(`IP: ${event.headers['client-ip']}`);
  // aBody.splice(0, 0, URL, '-'.repeat(20));
  const text = aBody.join('\n');

  await sendTelegram(text);

  return sendEmail({
    to: TO_EMAIL,
    from: SENDGRID_SINGLE_SENDER,
    subject: `${SITE_NAME}: ${subject}`,
    text,
    html: aBody.join('<br><br>'),
  });
};
