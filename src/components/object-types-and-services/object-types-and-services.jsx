/** @jsx jsx */
import { jsx } from '@emotion/react';

import { getListItems } from '../../utils/list-info';

import { space } from '../../theme/space';

import Layout from '../Layout/SimpleLayoutWithHeader';
import SEO from '../SEO';

import CardList from './CardList';

const htmlStyle = {
  marginTop: space[6],
  marginBottom: space[10],
};

const ObjectTypeServiceList = ({ path, data, locale, type }) => {
  const { translations, address, mainNav, footerNav, socialLinks, page, pageItems = [] } = data;
  const { html, title, metaTitle, description, metaDescription, noindex } = page;

  /**
   * filter mainNav by existing edges from page query
   */
  const items = getListItems(mainNav, type).reduce((acc, curr) => {
    const edge = pageItems.edges.find(({ node: { slug } }) => slug === curr.to);
    if (edge) {
      acc.push({
        title: edge.node.title,
        description: edge.node.description,
        metaDescription: edge.node.metaDescription,
        to: edge.node.slug,
        cover: edge.node.cover,
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
      <CardList items={items} />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
