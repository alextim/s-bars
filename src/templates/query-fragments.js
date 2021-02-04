import { graphql } from 'gatsby';

export const pageFragment = graphql`
  fragment PageFragment on MarkdownRemark {
    frontmatter {
      title
      description
      metaTitle
      metaDescription
      cover {
        xl {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        sm {
          childImageSharp {
            fluid(maxWidth: 480) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        alt
      }
      noindex
      sections {
        title
        subtitle
        text
        image {
          sm {
            childImageSharp {
              fluid(maxWidth: 480) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          alt
        }
        type
        items {
          title
          to
          subtitle
          text
          icon
          image {
            sm {
              childImageSharp {
                fluid(maxWidth: 480) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            alt
          }
        }
      }
    }
    html
  }
`;

export const postFragment = graphql`
  fragment PostFragment on MarkdownRemark {
    frontmatter {
      title
      description
      metaTitle
      metaDescription
      cover {
        xl {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        sm {
          childImageSharp {
            fluid(maxWidth: 480) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        alt
      }
      category
      tags
      publishedDate
      state
      noindex
    }
    timeToRead
    excerpt
    html
  }
`;

export const postCardFragment = graphql`
  fragment PostCardFragment on MarkdownRemark {
    frontmatter {
      title
      description
      metaTitle
      metaDescription
      cover {
        sm {
          childImageSharp {
            fluid(maxWidth: 480) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        alt
      }
      category
      tags
      publishedDate
      noindex
    }
    fields {
      slug
    }
    excerpt(pruneLength: 180)
    timeToRead
    html
  }
`;

export const postShortInfoFragment = graphql`
  fragment PostShortInfoFragment on MarkdownRemark {
    frontmatter {
      title
    }
    fields {
      slug
    }
  }
`;

export const addressFragment = graphql`
  fragment AddressFragment on Yaml {
    legalName
    postalAddress {
      streetAddress
      addressLocality
      postalCode
      addressCountry
    }
    contactPoint {
      name
      description
      contactType
      telephone
      email
    }
  }
`;
