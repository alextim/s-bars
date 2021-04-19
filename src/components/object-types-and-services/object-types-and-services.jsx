/** @jsx jsx */
import { jsx } from '@emotion/react';

import { getListItems } from '../../helpers/list-info';

import Layout from '../Layout';
import SEO from '../SEO';

import styleHtml from '../styles/styleHtml';

import CardList from './CardList';

const ObjectTypeServiceList = ({ data, pathname, locale, type }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    pageItems = [],
    page: { html, title, metaTitle, headline, metaDescription, noindex },
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
      headline={headline}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={pathname}
        noindex={noindex}
      />
      <CardList items={items} />
      {html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
