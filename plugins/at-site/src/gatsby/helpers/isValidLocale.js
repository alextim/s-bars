const path = require('path');
const i18n = require('../../../../../src/i18n/i18n');

module.exports = (locale, fileNode) => {
  if (!locale) {
    const parsedFilePath = path.parse(fileNode.relativePath);
    const { ext } = parsedFilePath;
    if (process.env.WARNINGS) {
      console.warn(`The file "${fileNode.relativePath}" does not contain locale in it's name'.'`);
      console.warn(`Valid file name sample: "index.${i18n.defaultLang}.${ext}".`);
      console.warn('This file will be excluded from current build.\n');
    }
    return false;
  }
  if (!i18n.isValidLang(locale)) {
    if (process.env.WARNINGS) {
      console.warn(
        `The file "${fileNode.relativePath}" has unsupported locale "${locale}" in it's name`,
      );
      console.warn('List of valid locales from your config:', i18n.localeCodes);
      console.warn('This file will be excluded from current build.\n');
    }
    return false;
  }
  return true;
};
