const EMAIL_FIELD = 'tvtqk';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 40;
const EMAIL_MIN_LENGTH = 3;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MIN_LENGTH = 2;
const MESSAGE_MAX_LENGTH = 256;

module.exports = {
  EMAIL_FIELD,

  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  MESSAGE_MAX_LENGTH,

  NAME_PATTERN: /^([a-zA-Zа-яА-ЯієїґҐЄІЇ]+\s)*[a-zA-Zа-яА-ЯієїґҐЄІЇ]+$/,

  validateNameLength: (x) => x && x.length >= NAME_MIN_LENGTH && x.length <= NAME_MAX_LENGTH,
  validateEmailLength: (x) => x && x.length >= EMAIL_MIN_LENGTH && x.length <= EMAIL_MAX_LENGTH,
  validateMessageLength: (x) =>
    x && x.length >= MESSAGE_MIN_LENGTH && x.length <= MESSAGE_MAX_LENGTH,
};
