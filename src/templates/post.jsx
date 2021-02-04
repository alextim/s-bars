/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql /* , Link */ } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayoutWithHeader';
import AsideRecentPosts from '../components/AsideRecentPosts';

const styleWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[8],
  [t.mq.lg]: {
    gridTemplateColumns: '3fr 1fr',
  },
});

const styleImg = (t) => ({
  marginBottom: t.space[4],
});

const styleWidgetArea = (t) => ({
  [t.mq.lg]: {
    height: '100%',
    borderLeft: '1px solid #b4d5e7',
  },
});

const PostTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, cover, noindex },
    html,
  } = data.post;
  return (
    <Layout
      title={title}
      subtitle={description}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      <div css={styleWrap}>
        <div>
          {cover && cover.sm && (
            <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} css={styleImg} />
          )}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
        <aside css={styleWidgetArea}>
          <AsideRecentPosts items={data.recentPosts.edges} />
        </aside>
      </div>
    </Layout>
  );
};

export default PostTemplate;

export const postQuery = graphql`
  query PostQuery($id: String!, $locale: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...PostFragment
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___publishedDate], order: DESC }
      limit: 10
      filter: {
        frontmatter: { state: { eq: "published" } }
        fields: { type: { eq: "post" }, locale: { eq: $locale } }
      }
    ) {
      edges {
        node {
          ...PostShortInfoFragment
        }
      }
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
            submenu {
              title
              to
            }
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
