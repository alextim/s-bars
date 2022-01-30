import { prevLink, nextLink } from '@/templates/blog/post-list/components/PostPagination/page-link-params';
import { useTranslation } from '@/i18n';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

import styleCardsWrap from '../../../shared/styles/styleCardsWrap';
import styleHtml from '../../../shared/styles/styleHtml';

import config from '../../../../../s-bars.content/config/website';

import PostPagination from './PostPagination';
// import { CategoryWidget, TagsWidget, YearsWidget } from '@/components/post-widgets';

const Cards = ({ posts, readMore, cardComponent }) => {
  const { t } = useTranslation();
  const readMoreText = t(readMore || config.readMore);
  return posts.edges.map(({ node }) => cardComponent(node.slug, node, readMoreText));
};

const PostListBase = ({
  data,
  pathname,
  /**
   * keep it for the future!
   */
  /*
  pageContext: { locale, currentPage, numPages, categories, tags, years },
  */
  pageContext: { locale, to, currentPage, numPages },
  title,
  readMore,
  cardComponent,
}) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { html, title: defaultTitle, metaTitle, headline, metaDescription, noindex, breadcrumbs },
    posts,
  } = data;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const links = [];

  if (numPages > 1) {
    if (!isFirst) {
      links.push({
        rel: 'prev',
        href: config.siteUrl + prevLink(currentPage, to),
      });
    }
    if (!isLast) {
      links.push({
        rel: 'next',
        href: config.siteUrl + nextLink(currentPage, to),
      });
    }
  }

  return (
    <Layout
      title={title || defaultTitle}
      headline={headline}
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={pathname}
        noindex={noindex}
        breadcrumbs={breadcrumbs}
        pageType="Blog"
        links={links}
      />
      {isFirst && html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}

      <div css={styleCardsWrap}>
        <Cards posts={posts} readMore={readMore} cardComponent={cardComponent} />
      </div>
      <PostPagination currentPage={currentPage} numPages={numPages} slug={to} />
    </Layout>
  );
};

export default PostListBase;
