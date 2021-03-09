const path = require('path');

const i18n = require('../../../../../src/i18n/i18n');
const isValidLocale = require('./isValidLocale');

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  const fileNode = getNode(node.parent);

  const parsedFilePath = path.parse(fileNode.relativePath);

  const { dir, name } = parsedFilePath;

  const [type, locale] = name.split('.');

  if (dir.split('/')[0] === 'locales' && !isValidLocale(locale, fileNode)) {
    return;
  }

  if (type === 'footer-nav') {
    createNodeField({
      name: 'to',
      node,
      value: node.to ? i18n.localizePath(node.to, locale) : null,
    });
  }
  if (type === 'main-nav') {
    createNodeField({
      name: 'to',
      node,
      value: node.to ? i18n.localizePath(node.to, locale) : null,
    });
    if (node.submenu && Array.isArray(node.submenu)) {
      const submenuItems = node.submenu.map(({ title, to }) => ({
        title,
        to: i18n.localizePath(to, locale),
      }));
      createNodeField({
        name: 'submenu',
        node,
        value: submenuItems,
      });
    }
  }

  createNodeField({
    name: 'locale',
    node,
    value: locale,
  });
  createNodeField({
    name: 'type',
    node,
    value: type,
  });
};
