const path = require('path');

const i18n = require('../../../../../src/i18n/i18n');
const isValidLocale = require('./isValidLocale');

module.exports = ({ node, getNode }) => {
  const fileNode = getNode(node.parent);

  const { frontmatter } = node;
  if (!frontmatter) {
    throw new Error('Frontmatter is absent!');
  }
  // skip draft docs
  if (frontmatter.state === 'draft') {
    return false;
  }

  const parsedFilePath = path.parse(fileNode.relativePath);
  const { name, dir } = parsedFilePath;

  const [slugFileName, locale] = name.split('.');

  let slug;

  if (slugFileName === 'home') {
    slug = '/';
  } else {
    slug = frontmatter.slug;
    if (slug) {
      slug = `/${slug}/`;
    } else {
      slug = `/${slugFileName === 'index' ? dir : slugFileName}/`;
    }
  }

  if (process.env.ONLY && !process.env.ONLY.split(' ').some((p) => p === slug)) {
    if (process.env.WARNINGS) {
      console.warn(`Path "${slug}" is excluded from build. process.env.ONLY=${process.env.ONLY}`);
    }
    return false;
  }

  if (!isValidLocale(locale, fileNode)) {
    return false;
  }

  slug = i18n.localizePath(slug, locale);

  return { slug, locale, frontmatter };
};
