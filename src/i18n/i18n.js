const i18n = require('@alextim/i18n-utils');
const allLocales = require('../../s-bars.content/config/locales');

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

const isValidLang = (x) => i18n.isValidLang(x, locales);

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
  isDefaultLang: (lang) => i18n.isDefaultLang(lang, defaultLang),
  isValidLang,
  localizePath: (path, lang) => i18n.localizePath(path, lang, defaultLang),
  purePath,
  pureSlug: (slug) => i18n.pureSlug(slug, locales),
  locales,
  localeCodes,
  langFromPath,
};
