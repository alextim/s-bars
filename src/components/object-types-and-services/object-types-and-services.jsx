/** @jsx jsx */
import { jsx } from '@emotion/react';

import { getListItems } from '../../utils/list-info';

import { space } from '../../theme/space';

import Layout from '../Layout';
import SEO from '../SEO';

import CardList from './CardList';

const htmlStyle = {
  marginTop: space[6],
  marginBottom: space[10],
};

const ObjectTypeServiceList = ({ data, type }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    pageItems = [],
    page: { html, title, metaTitle, description, metaDescription, noindex, locale, slug },
  } = data;

  /**
   * filter mainNav by existing edges from page query
   */
  const items = getListItems(mainNav, type).reduce((acc, curr) => {
    const edge = pageItems.edges.find(({ node }) => node.slug === curr.to);
    if (edge) {
      acc.push({
        title: edge.node.title,
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
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
      />
      <CardList items={items} />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
