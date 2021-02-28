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
  datePublished: {
    type: 'Date',
  },
  featured: {
    type: 'Boolean',
  },
};

const section = {
  title: {
    type: 'String',
  },
  subtitle: {
    type: 'String',
  },
  text: {
    type: 'String',
  },
  image: {
    type: 'Image',
  },
  items: {
    type: '[SectionItem]',
  },
};

const sectionItem = {
  title: {
    type: 'String',
  },
  to: {
    type: 'String',
  },
  subtitle: {
    type: 'String',
  },
  text: {
    type: 'String',
  },
  image: {
    type: 'Image',
  },
  icon: {
    type: 'String',
  },
};

module.exports = {
  generalFrontmatterFields,
  postFrontmatterFields,
  section,
  sectionItem,
};
