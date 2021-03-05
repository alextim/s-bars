import i18n from '../i18n';

export const prevLink = (currentPage, subpath, locale) =>
  i18n.localizePath(`${subpath}/${currentPage - 1 === 1 ? '' : `${currentPage - 1}/`}`, locale);

export const nextLink = (currentPage, subpath, locale) =>
  i18n.localizePath(`${subpath}/${currentPage + 1}/`, locale);

export const currentLink = (page, subpath, locale) =>
  i18n.localizePath(`${subpath}/${page === 1 ? '' : `${page}/`}`, locale);
