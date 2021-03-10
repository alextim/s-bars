const extractData = require('../../../../at-site/src/gatsby/helpers/extractData');

module.exports = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const result = extractData({ node, getNode });
  if (!result) {
    return;
  }

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
    template,
    noindex,

    category,
    tags,
    featured,
    datePublished,
    dateModified,
  } = frontmatter;

  const year = datePublished ? new Date(datePublished).getFullYear() : null;

  const fieldData = {
    title,
    description,
    metaTitle,
    metaDescription,
    cover,
    sections,
    html,
    template,
    noindex,

    category,
    tags,
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
