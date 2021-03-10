module.exports = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `
    interface Post implements Node {
      id: ID!
      title: String!
      description: String
      metaTitle: String
      metaDescription: String
      cover: Image

      category: [String]
      tags: [String]
      featured: Boolean
      datePublished: Date
      dateModified: Date,

      template: String
      noindex: Boolean

      html: String!
      htmlAst: JSON!
      excerpt(pruneLength: Int = 180): String!
      timeToRead: Int

      locale: String!
      slug: String!
      year: Int
    }

    type MdPost implements Post & Node  @dontInfer {
      title: String!
      description: String
      metaTitle: String
      metaDescription: String
      cover: Image

      category: [String]
      tags: [String]
      featured: Boolean
      datePublished: Date
      dateModified: Date,

      template: String
      noindex: Boolean

      html: String! @mdpassthrough(fieldName: "html")
      htmlAst: JSON! @mdpassthrough(fieldName: "htmlAst")
      excerpt(pruneLength: Int = 180): String! @mdpassthrough(fieldName: "excerpt")
      timeToRead: Int @mdpassthrough(fieldName: "timeToRead")

      locale: String!
      slug: String!
      year: Int
    }
    `,
  ];

  createTypes(typeDefs);
};
