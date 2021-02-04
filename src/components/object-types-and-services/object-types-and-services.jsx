/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import Layout from '../Layout/SimpleLayoutWithHeader';
import SEO from '../SEO';

import { getListItems } from '../../utils/list-info';

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

const ObjectTypeServiceList = ({ path, data, locale, type }) => {
  const { translations, address, mainNav, footerNav, socialLinks, page, pageItems = [] } = data;

  const {
    html,
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = page;

  /**
   * filter mainNav by existing edges from page query
   */
  const items = getListItems(mainNav, type).reduce((acc, curr) => {
    const edge = pageItems.edges.find(
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
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
