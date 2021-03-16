const {
  EMAIL_FIELD,

  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_PATTERN,

  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  EMAIL_VALIDATOR,

  MESSAGE_MAX_LENGTH,

  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_PATTERN,
} = require('./defaults');

// const validate = (x, min, max, required) => (x ? x.length >= min && x.length <= max : !required);

module.exports = {
  subject: {
    humanName: 'Тема',
    required: true,
    maxLength: 40,
  },

  message: {
    humanName: 'Запрос',
    maxLength: MESSAGE_MAX_LENGTH,
  },

  name: {
    humanName: 'Имя',
    required: true,
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
    pattern: NAME_PATTERN,
  },

  position: {
    humanName: 'Должность',
    maxLength: 40,
  },

  company: {
    humanName: 'Организация',
    maxLength: 40,
  },

  phone: {
    humanName: 'Телефон',
    required: true,
    minLength: PHONE_MIN_LENGTH,
    maxLength: PHONE_MAX_LENGTH,
    pattern: PHONE_PATTERN,
  },

  [EMAIL_FIELD]: {
    humanName: 'E-mail',
    minLength: EMAIL_MIN_LENGTH,
    maxLength: EMAIL_MAX_LENGTH,
    validate: EMAIL_VALIDATOR,
  },
};
