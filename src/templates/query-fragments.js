import { graphql } from 'gatsby';

export const mdPageFragment = graphql`
  fragment MdPageFragment on MdPage {
    title
    headline
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
      title
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
        title
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
          title
        }
      }
    }
    slug
    locale
    html
  }
`;

export const mdPostFragment = graphql`
  fragment MdPostFragment on MdPost {
    title
    headline
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
      title
    }
    category {
      title
      to
    }
    tags {
      title
      to
    }
    dateModified
    datePublished
    noindex
    timeToRead
    excerpt
    slug
    locale
    html
  }
`;

export const mdPostCardFragment = graphql`
  fragment MdPostCardFragment on MdPost {
    title
    headline
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
      title
    }
    category {
      title
      to
    }
    tags {
      title
      to
    }
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
    headline
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
      title
    }
    slug
  }
`;

export const mdPostShortInfoFragment = graphql`
  fragment MdPostShortInfoFragment on MdPost {
    title
    slug
  }
`;

export const addressFragment = graphql`
  fragment AddressFragment on Address {
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
