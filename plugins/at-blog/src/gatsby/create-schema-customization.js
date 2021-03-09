const postFrontmatterFields = {
  category: {
    type: '[String]',
  },
  tags: {
    type: '[String]',
  },
  featured: {
    type: 'Boolean',
  },
  datePublished: {
    type: 'Date',
  },
  dateModified: {
    type: 'Date',
  },
};

module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: 'MarkdownRemark',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        frontmatter: {
          type: 'Frontmatter',
        },
        fields: {
          type: 'MarkdownRemarkFields',
        },
      },
    }),

    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        ...postFrontmatterFields,
      },
    }),

    schema.buildObjectType({
      name: 'MarkdownRemarkFields',
      fields: {
        year: {
          type: 'Int',
        },
      },
    }),
  ];

  createTypes(typeDefs);
};
