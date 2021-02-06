const priceListSection = {
  sectionTitle: {
    type: 'String',
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
