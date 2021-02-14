const {
  EMAIL_FIELD,

  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_PATTERN,

  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  EMAIL_VALIDATOR,

  MESSAGE_MIN_LENGTH,
  MESSAGE_MAX_LENGTH,
} = require('./defaults');

module.exports = {
  [EMAIL_FIELD]: {
    humanName: 'E-mail',
    required: true,
    mappingName: 'email',
    minLength: EMAIL_MIN_LENGTH,
    maxLength: EMAIL_MAX_LENGTH,
    validator: EMAIL_VALIDATOR,
  },

  name: {
    humanName: 'Имя',
    required: true,
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
    pattern: NAME_PATTERN,
  },

  message: {
    humanName: 'Сообщение',
    required: true,
    minLength: MESSAGE_MIN_LENGTH,
    maxLength: MESSAGE_MAX_LENGTH,
  },
};
