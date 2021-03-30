import { graphql } from 'gatsby';

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

export const mdPostShortInfoFragment = graphql`
  fragment MdPostShortInfoFragment on MdPost {
    title
    slug
  }
`;
