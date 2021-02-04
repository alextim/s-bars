/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
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

const Cards = ({ items }) => {
  const theme = useTheme();
  return (
    <div css={styleItemsWrap}>
      {items.map(({ title, to, cover }, i) => (
        <div key={i} css={theme.card.wrap}>
          {cover && cover.sm && (
            <a href={to}>
              <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} />
            </a>
          )}
          <div css={theme.card.textWrap}>
            <h2 css={theme.card.heading}>
              <a href={to} css={theme.card.link}>
                {title}
              </a>
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

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
      <Cards items={items} />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
