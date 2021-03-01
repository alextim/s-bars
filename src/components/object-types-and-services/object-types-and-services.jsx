/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import card from '../../theme/card';
import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

import Layout from '../Layout/SimpleLayoutWithHeader';
import SEO from '../SEO';
import getCardSchema from '../SeoBase/getCardSchema';
import { getListItems } from '../../utils/list-info';

const htmlStyle = {
  marginTop: space[6],
  marginBottom: space[10],
};

const styleItemsWrap = {
  display: 'grid',
  gridGap: space[7],
  // gridTemplateColumns: '1fr',
  [mq.lg]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
};

const Cards = ({ items }) => {
  return (
    <div css={styleItemsWrap}>
      {items.map(({ title, to, cover, description, metaDescription }, i) => (
        <article key={i} css={card.wrap}>
          <script type="application/ld+json">
            {JSON.stringify(
              getCardSchema({
                to,
                title,
                description: description || metaDescription,
                cover,
              }),
            )}
          </script>
          {cover && cover.sm && (
            <a href={to}>
              <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} />
            </a>
          )}
          <div css={card.textWrap}>
            <h2 css={card.heading}>
              <a href={to} css={card.link}>
                {title}
              </a>
            </h2>
          </div>
        </article>
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
        description: edge.node.frontmatter.description,
        metaDescription: edge.node.frontmatter.metaDescription,
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
        pageType="Article"
      />
      <Cards items={items} />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
