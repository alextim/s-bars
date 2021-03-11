const extractData = require('./extractData');

module.exports = (
  { node, actions, getNode, createNodeId, createContentDigest },
  type,
  fields = {},
) => {
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
    htmlAst,
    template,
    noindex,
  } = frontmatter;

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
    locale,
    type,
    slug,
  };

  Object.keys(fields).forEach((key) => {
    fieldData[key] = fields[key](frontmatter);
  });

  const mdType = 'MdPage';
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
      description: 'Md implementation of the Page interface',
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
