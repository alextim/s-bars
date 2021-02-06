const priceListSection = {
  sectionTitle: {
    type: 'String',
  },
  headInfo: {
    type: 'PriceListSectionHeadInfo',
  },
  groups: {
    type: '[PriceListGroup]',
  },
};

const priceListSectionHeadInfo = {
  name: {
    type: 'String',
  },
  price: {
    type: 'PriceListPrice',
  },
  description: {
    type: 'String',
  },
};

const priceListPrice = {
  title: {
    type: 'String',
  },
  subtitles: {
    type: '[String]',
  },
};

const priceListGroup = {
  groupTitle: {
    type: 'String',
  },
  rows: {
    type: '[[String]]',
  },
};

module.exports = {
  priceListSection,
  priceListGroup,
  priceListSectionHeadInfo,
  priceListPrice,
};
