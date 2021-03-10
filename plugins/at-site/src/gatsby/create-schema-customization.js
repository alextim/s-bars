const resolverPassthrough = require('./helpers/resolverPassthrough');

module.exports = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: 'mdpassthrough',
    args: {
      fieldName: 'String!',
    },
    extend({ fieldName }) {
      return {
        resolve: resolverPassthrough(fieldName, 'MarkdownRemark'),
      };
    },
  });

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

    `
    type Image {
      sm: File @fileByRelativePath
      xl: File @fileByRelativePath
      alt: String
    }

    type Section {
      title: String
      subtitle: String
      text: String
      image: Image
      items: [SectionItem]
    }

    type SectionItem {
      title: String
      to: String
      subtitle: String
      text: String
      image: Image
      icon: String
    }

    interface Page implements Node {
      id: ID!
      title: String!
      description: String
      metaTitle: String
      metaDescription: String
      cover: Image
      template: String
      noindex: Boolean
      sections: [Section]
      html: String!
      locale: String!
      type: String!
      slug: String!
    }

    type MdPage implements Page & Node @dontInfer {
      title: String!
      description: String
      metaTitle: String
      metaDescription: String
      cover: Image
      template: String
      noindex: Boolean
      sections: [Section]
      html: String! @mdpassthrough(fieldName: "html")
      locale: String!
      type: String!
      slug: String!
    }

    type Yaml implements Node @dontInfer {
      # navItem,
      to: String
      title: String

      # translationItem
      key: String!
      value: String!

      # socialLinkItem
      code: String!

      # address
      name: String
      alternateName: String
      legalName: String
      description: String
      contactPoint: [ContactPoint]
      postalAddress: PostalAddress

      # contacts
      organizationType: String
      phone: [String]
      voice: Voice
      geo: Geo
      fax: String
      email: [String]
      openingHours: [[String]]
      hasMap: String
      embedMap: String
      foundingDate: Date
      priceRange: String
      currenciesAccepted: String
      paymentAccepted: String

      fields: YamlFields
    }

    type YamlFields {
      locale: String
      type: String
      to: String
      submenu: [NavItem]
    }

    type ContactPoint {
      name: String
      description: String
      contactType: String
      telephone: [String]
      email: [String]
      areaServed: String
    }

    type NavItem {
      to: String
      title: String!
    }

    type PostalAddress {
      streetAddress: [String]
      addressLocality: String
      addressRegion: String
      postalCode: Int
      addressCountry: String
    }

    type Geo {
      latitude: String!
      longitude: String!
    }

    type Voice {
      skype: String
      whatsapp: String
      telegram: String
      viber: String
    }
    `,

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
      },
    }),
  ];

  createTypes(typeDefs);
};
