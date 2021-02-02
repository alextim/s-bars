/*
for html
const resolverPassthrough = (typeName, fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType(typeName);
  const mdNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdNode, args, context, {
    fieldName,
  });
  return result;
};
*/

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
};

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
  legalName: {
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
};

module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    /**
     * https://www.gatsbyjs.org/docs/scaling-issues/
     *
     * Switch off type inference for SitePage.context
     */
    schema.buildObjectType({
      name: 'SitePage',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        path: {
          type: 'String!',
        },
      },
    }),

    schema.buildObjectType({
      name: 'Yaml',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        ...navItem,
        ...translationItem,
        ...socialLinkItem,
        ...address,
        ...contacts,
        fields: {
          type: 'YamlFields',
        },
      },
    }),
    schema.buildObjectType({
      name: 'YamlFields',
      fields: {
        ...yamlFields,
      },
    }),
    schema.buildObjectType({
      name: 'ContactPoint',
      fields: {
        ...contactPoint,
      },
    }),
    schema.buildObjectType({
      name: 'NavItem',
      fields: {
        ...navItem,
      },
    }),
    schema.buildObjectType({
      name: 'PostalAddress',
      fields: {
        ...postalAddress,
      },
    }),
    schema.buildObjectType({
      name: 'Geo',
      fields: {
        ...geo,
      },
    }),
    schema.buildObjectType({
      name: 'Voice',
      fields: {
        ...voice,
      },
    }),

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
        /*
        html: {
          type: 'String',
        },
        timeToRead: {
          type: 'Int',
        },
        excerpt: {
          type: 'String',
        },
        */
        fields: {
          type: 'MarkdownRemarkFields',
        },
      },
    }),

    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        ...generalFrontmatterFields,
        ...postFrontmatterFields,
        sections: {
          type: '[Section]',
        },
      },
    }),

    schema.buildObjectType({
      name: 'Section',
      fields: {
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
        type: {
          type: 'String',
        },
      },
    }),

    schema.buildObjectType({
      name: 'SectionItem',
      fields: {
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
      },
    }),

    schema.buildObjectType({
      name: 'MarkdownRemarkFields',
      fields: {
        locale: {
          type: 'String',
        },
        type: {
          type: 'String',
        },
        slug: {
          type: 'String',
        },
        year: {
          type: 'Int',
        },
      },
    }),

    schema.buildObjectType({
      name: 'Image',
      fields: {
        sm: {
          type: 'File',
          extensions: {
            fileByRelativePath: {},
          },
        },
        xl: {
          type: 'File',
          extensions: {
            fileByRelativePath: {},
          },
        },
        alt: {
          type: 'String',
        },
      },
    }),
  ];

  createTypes(typeDefs);
};
