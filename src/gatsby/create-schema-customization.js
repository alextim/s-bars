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
const {
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
} = require('./schema-fields/yaml');

const { generalFrontmatterFields, postFrontmatterFields } = require('./schema-fields/md');

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
