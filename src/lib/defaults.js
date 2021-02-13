const emailValidator = require('email-validator');
const EMAIL_FIELD = require('./email-field');

module.exports = {
  EMAIL_FIELD,

  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 40,
  NAME_PATTERN: /^([a-zA-Zа-яА-ЯієїґҐЄІЇ]+\s)*[a-zA-Zа-яА-ЯієїґҐЄІЇ]+$/,

  EMAIL_MIN_LENGTH: 3,
  EMAIL_MAX_LENGTH: 254,
  EMAIL_VALIDATOR: (x) => emailValidator.validate(x),

  MESSAGE_MIN_LENGTH: 2,
  MESSAGE_MAX_LENGTH: 256,

  PHONE_MIN_LENGTH: 6,
  PHONE_MAX_LENGTH: 15,
  PHONE_PATTERN: /[0-9]+$/i,
};
