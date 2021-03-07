const allLocales = require('../../config/locales');

// Only allow languages defined in the LOCALES env variable.
// This allows us to compile only languages that are "complete" or test only
// a single language
const getLanguages = () => {
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
};

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
    return `/${lang}/`;
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

const pureSlug = (slug) => {
  if (slug === '/') {
    return '/';
  }
  const a = slug.split('/');
  const locale = a[1];
  const isLocalized = localeCodes.some((el) => locale === el);
  return isLocalized ? a.slice(2) : a.slice(-1, 1).join('/');
};

const purePath = (path) => {
  if (path === '/') {
    return '/';
  }
  const a = path.split('/');
  const locale = a[1];
  const isLocalized = localeCodes.some((el) => locale === el);
  if (!isLocalized) {
    return path;
  }
  return `/${a.slice(2).join('/')}`;
};

module.exports = {
  i18nEnabled,
  defaultLang,
  defaultLocale,
  isDefaultLang,
  isValidLang,
  localizePath,
  purePath,
  pureSlug,
  locales,
  localeCodes,
  langFromPath,
};
