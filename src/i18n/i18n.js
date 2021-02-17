const allLocales = require('../../config/locales');

// Only allow languages defined in the LOCALES env variable.
// This allows us to compile only languages that are "complete" or test only
// a single language
function getLanguages() {
  if (!process.env.LOCALES) {
    return allLocales;
  }

  const langCodes = process.env.LOCALES.split(' ');
  if (!langCodes || langCodes.length === 0) {
    throw new Error('You should provide at least one locale.');
  }

  const locales = {};
  langCodes.forEach((code) => {
    const locale = allLocales[code];
    // Error if one of the locales provided isn't a valid locale
    if (!locale) {
      throw new Error(
        `Invalid locale provided: ${code}. See i18n.json for the list of available locales.`,
      );
    }
    locales[code] = locale;
  });
  return locales;
}

const locales = getLanguages();
const localeCodes = Object.keys(locales);
const i18nEnabled = localeCodes.length > 1;

const findDefaultLang = () => {
  for (let i = 0; i < localeCodes.length; i++) {
    if (locales[localeCodes[i]].default) {
      return localeCodes[i];
    }
  }
  return undefined;
};

const defaultLang = findDefaultLang() || locales.localeCodes[0];
const defaultLocale = locales[defaultLang];

const isDefaultLang = (lang) => lang === defaultLang;
/**
 *
 * @param {string} path - '/', '/posts'
 * @param {string} lang - 'ru', 'en'
 *
 * if lang is default
 *   return path
 *
 * if path == /
 *   return `/${lang}`
 *
 * else
 *   return `/${lang}${path}
 */
const localizePath = (path, lang) => {
  if (isDefaultLang(lang)) {
    return path;
  }
  if (path === '/') {
    return `/${lang}`;
  }
  return `/${lang}${path}`;
};

const isValidLang = (x) => x && typeof x === 'string' && locales[x];

const langFromPath = (path) => {
  if (!path || path === '/') {
    return defaultLang;
  }
  const [, lang] = path.split('/');
  if (!isValidLang(lang)) {
    return defaultLang;
  }
  return lang;
};

const removeTrailingSlash = (s) => s.replace(/\/$/, '');

const purePath = (path) => {
  if (path === '/') {
    return '/';
  }
  const s = removeTrailingSlash(path);
  const i = s.indexOf('/', 1);
  if (i === -1 && s.length === 3) {
    return '/';
  }
  if (i === 3) {
    return s.length === 3 ? '/' : s.substring(3);
  }
  return s;
};

module.exports = {
  i18nEnabled,
  defaultLang,
  defaultLocale,
  isDefaultLang,
  isValidLang,
  localizePath,
  purePath,
  locales,
  localeCodes,
  langFromPath,
};
