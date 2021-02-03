/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout/SimpleLayoutWithHeader';
import SEO from '../components/SEO';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const styleItemsWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[7],
  // gridTemplateColumns: '1fr',
  [t.mq.lg]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const styleCard = (t) => ({
  backgroundColor: t.colors.secondaryBackground,
  ':hover': {
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
});

const styleHeading = {
  margin: 0,
};

const styleCardText = (t) => ({
  padding: t.space[4],
});

const styleAnchor = (t) => ({
  color: t.colors.text,
  ':hover, :focus, :active': {
    textDecoration: 'none',
  },
});
const ObjectTypeListTemplate = ({ path, data, pageContext: { locale } }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page,
    objectTypePages = [],
  } = data;

  const {
    html,
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = page;

  const items = mainNav.edges[1].node.fields.submenu.reduce((acc, curr) => {
    const edge = objectTypePages.edges.find(
      ({
        node: {
          fields: { slug },
        },
      }) => slug === curr.to,
    );
    if (edge) {
      acc.push({
        title: edge.node.frontmatter.title,
        to: edge.node.fields.slug,
        cover:
          edge.node.frontmatter.cover && edge.node.frontmatter.cover.sm
            ? { ...edge.node.frontmatter.cover }
            : null,
      });
    }
    return acc;
  }, []);

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
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}

      <div css={styleItemsWrap}>
        {items.map(({ title: itemTitle, to, cover }, i) => (
          <div key={i} css={styleCard}>
            {cover && cover.sm && (
              <a href={to}>
                <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} />
              </a>
            )}
            <div css={styleCardText}>
              <h2 css={styleHeading}>
                <a href={to} css={styleAnchor}>
                  {itemTitle}
                </a>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ObjectTypeListTemplate;

export const pageQuery = graphql`
  query ObjectTypeListPageQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...PageFragment
    }
    objectTypePages: allMarkdownRemark(
      filter: { fields: { type: { eq: "object-type" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          ...PostCardFragment
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
