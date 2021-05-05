const sanitizeHtml = require('./sanitizeHtml');

const sanitizeField = (x) => (x ? sanitizeHtml(x.trim()) : x);

const validateField = (x, fieldInfo) => {
  const { minLength, maxLength, required, pattern, validator } = fieldInfo;
  if (!x) {
    return !required;
  }

  const val = x.trim();
  const n = val.length;
  if (n < minLength || n > maxLength) {
    return false;
  }

  const sanitized = sanitizeHtml(val);
  if (sanitized.length < minLength) {
    return false;
  }

  if (pattern && !new RegExp(pattern).exec(sanitized)) {
    return false;
  }

  if (validator && !validator(sanitized)) {
    return false;
  }
  return true;
};

module.exports = { sanitizeField, validateField };
