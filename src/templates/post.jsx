/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql /* , Link */ } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';

import Layout from '../components/Layout/SimpleLayout';

import PostHeader from '../components/DefaultHeader';
import PostInfo from '../components/PostInfo';
import PostTags from '../components/PostTags';

const imageStyle = (t) => ({
  marginTop: t.space[6],
});

const htmlStyle = imageStyle;

const PostTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: {
      title,
      metaTitle,
      description,
      metaDescription,
      cover,
      noindex,
      tags,
      publishedDate,
    },
    html,
    timeToRead,
  } = data.post;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      <PostHeader title={title} subtitle={description} />
      <PostInfo publishedDate={publishedDate} timeToRead={timeToRead} />
      {cover && cover.sm && (
        <Img css={imageStyle} fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} />
      )}
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <PostTags tags={tags} />
    </Layout>
  );
};

export default PostTemplate;

export const postQuery = graphql`
  query PostQuery($id: String!, $locale: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...PostFragment
    }
    address: yaml(fields: { type: { eq: "address" }, locale: { eq: $locale } }) {
      ...AddressFragment
    }
    mainNav: allYaml(filter: { fields: { type: { eq: "main-nav" }, locale: { eq: $locale } } }) {
      edges {
        node {
          title
          fields {
            to
          }
        }
      }
    }
    footerNav: allYaml(
      filter: { fields: { type: { eq: "footer-nav" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          title
          fields {
            to
          }
        }
      }
    }
    socialLinks: allYaml(
      filter: { fields: { type: { eq: "social-links" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allYaml(
      filter: { fields: { type: { eq: "translations" }, locale: { eq: $locale } } }
      limit: 1000
    ) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
