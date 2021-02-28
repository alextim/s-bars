/**
 * YAML
 *
 */
const yamlFields = {
  locale: {
    type: 'String',
  },
  type: {
    type: 'String',
  },
  to: {
    type: 'String',
  },
  submenu: {
    type: '[NavItem]',
  },
};

const navItem = {
  to: {
    type: 'String',
  },
  title: {
    type: 'String!',
  },
};

const translationItem = {
  key: {
    type: 'String!',
  },
  value: {
    type: 'String!',
  },
};

const socialLinkItem = {
  code: {
    type: 'String!',
  },
};

const address = {
  name: {
    type: 'String',
  },
  alternateName: {
    type: 'String',
  },
  legalName: {
    type: 'String',
  },
  description: {
    type: 'String',
  },
  contactPoint: {
    type: '[ContactPoint]',
  },
  postalAddress: {
    type: 'PostalAddress',
  },
};

const postalAddress = {
  streetAddress: {
    type: '[String]',
  },
  addressLocality: {
    type: 'String',
  },
  addressRegion: {
    type: 'String',
  },
  postalCode: {
    type: 'Int',
  },
  addressCountry: {
    type: 'String',
  },
};

const geo = {
  latitude: {
    type: 'String!',
  },
  longitude: {
    type: 'String!',
  },
};

const voice = {
  skype: {
    type: 'String',
  },
  whatsapp: {
    type: 'String',
  },
  telegram: {
    type: 'String',
  },
  viber: {
    type: 'String',
  },
};

const contacts = {
  organizationType: {
    type: 'String',
  },
  phone: {
    type: '[String]',
  },
  voice: {
    type: 'Voice',
  },
  geo: {
    type: 'Geo',
  },
  fax: {
    type: 'String',
  },
  email: {
    type: '[String]',
  },
  openingHours: {
    type: '[[String]]',
  },
  hasMap: {
    type: 'String',
  },
  embedMap: {
    type: 'String',
  },
  foundingDate: {
    type: 'Date',
  },
  priceRange: {
    type: 'String',
  },
  currenciesAccepted: {
    type: 'String',
  },
  paymentAccepted: {
    type: 'String',
  },
};

const contactPoint = {
  name: {
    type: 'String',
  },
  description: {
    type: 'String',
  },
  contactType: {
    type: 'String',
  },
  telephone: {
    type: '[String]',
  },
  email: {
    type: '[String]',
  },
  areaServed: {
    type: 'String',
  },
};

module.exports = {
  yamlFields,
  navItem,
  translationItem,
  socialLinkItem,
  address,
  postalAddress,
  geo,
  voice,
  contacts,
  contactPoint,
};
