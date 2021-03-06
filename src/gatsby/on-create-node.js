const path = require('path');
const i18n = require('../i18n/i18n');

const isValidLocale = (locale, fileNode) => {
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

const onDataNode = (node, actions, getNode) => {
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

const onMdNode = (node, actions, getNode) => {
  const fileNode = getNode(node.parent);

  const isPage = fileNode.sourceInstanceName === 'pages';
  const isPost = fileNode.sourceInstanceName === 'posts';
  const isServicePage = fileNode.sourceInstanceName === 'services';
  const isObjectTypePage = fileNode.sourceInstanceName === 'object-types';

  if (!isPage && !isPost && !isServicePage && !isObjectTypePage) {
    return;
  }
  const { frontmatter } = node;
  if (!frontmatter) {
    throw new Error('Frontmatter is absent!');
  }

  const { createNodeField } = actions;

  const parsedFilePath = path.parse(fileNode.relativePath);
  const { name, dir } = parsedFilePath;

  const [slugFileName, locale] = name.split('.');

  let slug;

  if (slugFileName === 'home') {
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

  if (slug !== '/') {
    slug = `${slug}/`;
  }

  let type;
  if (isPage) {
    type = 'page';
  } else if (isPost) {
    type = 'post';
  } else if (isServicePage) {
    type = 'service';
  } else if (isObjectTypePage) {
    type = 'object-type';
  } else {
    throw new Error('Unknow Markdown node type');
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

  if (isPost) {
    const { datePublished } = frontmatter;
    const year = datePublished ? new Date(datePublished).getFullYear() : null;
    createNodeField({
      name: 'year',
      node,
      value: year,
    });
  }
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

module.exports = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  if (node.internal.type === 'Yaml') {
    onDataNode(node, actions, getNode);
    return;
  }

  if (node.internal.type === 'MarkdownRemark') {
    onMdNode(node, actions, getNode, createNodeId, createContentDigest);
  }
};
