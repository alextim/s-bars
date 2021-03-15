const extractData = require('../../../../at-site/src/gatsby/helpers/extractData');

const slugify = require('../../../../../src/lib/slugify');
const translit = require('../../../../../src/lib/translit');

const i18n = require('../../../../../src/i18n/i18n');

const compString = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

const a2oa = (a, prefix, locale) => {
  if (!a) {
    return null;
  }
  // eslint-disable-next-line no-console
  console.log('a=', typeof a, a);
  const aMap = new Map(a);
  return [...aMap].sort(compString).map((title) => ({
    title,
    to: i18n.localizePath(`${prefix}${slugify(translit(title, locale))}/`, locale),
  }));
};

module.exports = ({ node, actions, getNode, createNodeId, createContentDigest }, options) => {
  const result = extractData({ node, getNode });
  if (!result) {
    return;
  }
  const { categoryPath, tagsPath } = options;
  const { slug, locale, frontmatter } = result;

  const { createNode, createParentChildLink } = actions;

  const {
    title,
    description,
    metaTitle,
    metaDescription,
    cover,
    sections,
    html,
    htmlAst,
    template,
    noindex,

    category,
    tags,
    featured,
    datePublished,
    dateModified,
  } = frontmatter;

  const year = datePublished ? new Date(datePublished).getFullYear() : null;
  // eslint-disable-next-line no-console
  console.log(category, tags);
  const fieldData = {
    title,
    description,
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || description,
    cover,
    sections,
    html,
    htmlAst,
    template,
    noindex,

    category: a2oa(category, categoryPath, locale),
    tags: a2oa(tags, tagsPath, locale),
    featured,
    datePublished,
    dateModified,

    locale,
    slug,
    year,
  };

  const mdType = 'MdPost';
  const id = createNodeId(`${node.id} >>> ${mdType}`);

  createNode({
    ...fieldData,
    // Required fields
    id,
    parent: node.id,
    children: [],
    internal: {
      type: mdType,
      contentDigest: createContentDigest(fieldData),
      content: JSON.stringify(fieldData),
      description: 'Md implementation of the Post interface',
    },
  });

  createParentChildLink({ parent: node, child: getNode(id) });

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
