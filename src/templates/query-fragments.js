import { graphql } from 'gatsby';

export const mdPageFragment = graphql`
  fragment MdPageFragment on MdPage {
    title
    description
    metaTitle
    metaDescription
    cover {
      sm {
        publicURL
        childImageSharp {
          # fluid(maxWidth: 480)
          gatsbyImageData(layout: FULL_WIDTH)
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
            # fluid(maxWidth: 480)
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        alt
      }
      items {
        title
        to
        subtitle
        text
        icon
        image {
          sm {
            childImageSharp {
              # fluid(maxWidth: 480)
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alt
        }
      }
    }
    html
  }
`;

export const pageFragment = graphql`
  fragment PageFragment on MarkdownRemark {
    frontmatter {
      title
      description
      metaTitle
      metaDescription
      cover {
        sm {
          publicURL
          childImageSharp {
            # fluid(maxWidth: 480)
            gatsbyImageData(layout: FULL_WIDTH)
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
              # fluid(maxWidth: 480)
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alt
        }
        items {
          title
          to
          subtitle
          text
          icon
          image {
            sm {
              childImageSharp {
                # fluid(maxWidth: 480)
                gatsbyImageData(layout: FULL_WIDTH)
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
        sm {
          publicURL
          childImageSharp {
            # fluid(maxWidth: 480)
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        alt
      }
      category
      tags
      dateModified
      datePublished
      noindex
    }
    timeToRead
    excerpt
    html
  }
`;

export const mdPostFragment = graphql`
  fragment MdPostFragment on MdPost {
    title
    description
    metaTitle
    metaDescription
    cover {
      sm {
        publicURL
        childImageSharp {
          # fluid(maxWidth: 480)
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      alt
    }
    category
    tags
    dateModified
    datePublished
    noindex
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
          publicURL
          childImageSharp {
            # fluid(maxWidth: 480)
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        alt
      }
      category
      tags
      dateModified
      datePublished
    }
    fields {
      slug
    }
    excerpt(pruneLength: 180)
    timeToRead
  }
`;

export const mdPostCardFragment = graphql`
  fragment MdPostCardFragment on MdPost {
    title
    description
    metaTitle
    metaDescription
    cover {
      sm {
        publicURL
        childImageSharp {
          # fluid(maxWidth: 480)
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      alt
    }
    category
    tags
    dateModified
    datePublished
    slug
    excerpt(pruneLength: 180)
    timeToRead
  }
`;

export const mdCardFragment = graphql`
  fragment MdCardFragment on MdPage {
    title
    description
    metaTitle
    metaDescription
    cover {
      sm {
        publicURL
        childImageSharp {
          # fluid(maxWidth: 480)
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      alt
    }
    slug
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

export const mdPostShortInfoFragment = graphql`
  fragment MdPostShortInfoFragment on MdPost {
    title
    slug
  }
`;
export const addressFragment = graphql`
  fragment AddressFragment on Yaml {
    name
    legalName
    alternateName
    description
    postalAddress {
      streetAddress
      addressLocality
      addressRegion
      postalCode
      addressCountry
    }
    contactPoint {
      name
      description
      contactType
      areaServed
      telephone
      email
    }
  }
`;
