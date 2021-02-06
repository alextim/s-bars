/**
 * Markdown
 * */
const generalFrontmatterFields = {
  title: {
    type: 'String!',
  },
  description: {
    type: 'String',
  },

  metaTitle: {
    type: 'String',
  },
  metaDescription: {
    type: 'String',
  },

  cover: {
    type: 'Image',
  },
  slug: {
    type: 'String!',
  },
  template: {
    type: 'String',
  },
  noindex: {
    type: 'Boolean',
  },
};

/**
 * Post
 *
 */
const postFrontmatterFields = {
  category: {
    type: '[String]',
  },
  tags: {
    type: '[String]',
  },
  state: {
    type: 'String',
  },
  publishedDate: {
    type: 'Date',
  },
  featured: {
    type: 'Boolean',
  },
};

module.exports = {
  generalFrontmatterFields,
  postFrontmatterFields,
};
