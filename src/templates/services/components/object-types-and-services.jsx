import Layout from '@/components/Layout';

import { getListItems } from '../../shared/helpers/list-info';
import styleHtml from '../../shared/styles/styleHtml';
import CardList from './CardList';

const ObjectTypeServiceList = ({ data, type }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    pageItems = [],
    page: { html, title, headline, breadcrumbs },
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
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <CardList items={items} />
      {html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default ObjectTypeServiceList;
