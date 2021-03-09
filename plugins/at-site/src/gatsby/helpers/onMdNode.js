const path = require('path');

const i18n = require('../../../../../src/i18n/i18n');
const isValidLocale = require('./isValidLocale');

module.exports = ({ node, actions, getNode }, type, fields = {}) => {
  const fileNode = getNode(node.parent);

  const { frontmatter } = node;
  if (!frontmatter) {
    throw new Error('Frontmatter is absent!');
  }
  // skip draft docs
  if (frontmatter.state === 'draft') {
    return;
  }

  const { createNodeField } = actions;

  const parsedFilePath = path.parse(fileNode.relativePath);
  const { name, dir } = parsedFilePath;

  const [slugFileName, locale] = name.split('.');

  let slug;

  let isHome = false;
  if (slugFileName === 'home') {
    isHome = true;
    slug = '/';
  } else {
    slug = frontmatter.slug;
    if (slug) {
      slug = `/${slug}`;
    } else {
      slug = `/${slugFileName === 'index' ? dir : slugFileName}`;
    }
  }
  if (process.env.ONLY && !process.env.ONLY.split(' ').some((p) => p === slug)) {
    if (process.env.WARNINGS) {
      console.warn(`Path "${slug}" is excluded from build. process.env.ONLY=${process.env.ONLY}`);
    }
    return;
  }

  if (!isValidLocale(locale, fileNode)) {
    return;
  }

  slug = i18n.localizePath(slug, locale);

  if (!isHome) {
    slug = `${slug}/`;
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
  createNodeField({
    name: 'slug',
    node,
    value: slug,
  });

  Object.keys(fields).forEach((key) =>
    createNodeField({
      name: key,
      node,
      value: fields[key](frontmatter),
    }),
  );

  /*
  const getMetaTitle = (title, metaTitle, slg) => {
    const purePath = i18n.purePath(slg);

    // is Root
    if (purePath === '/') {
      return metaTitle || i18n.locales[locale].siteTitle;
    }
    return `${metaTitle || title} - ${i18n.locales[locale].siteShortName}`;
  };
  */
  //    metaTitle: getMetaTitle(title, metaTitle, slug),
  //    metaDescription: metaDescription || description || i18n.locales[locale].siteDescription,
};
