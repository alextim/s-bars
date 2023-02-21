import { graphql /* , Link */ } from 'gatsby';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import InnerAsideLayout from '@/components/InnerAsideLayout';

import AsideServices from '../../service/components/AsideServices';
import AsideFeaturedPosts from './components/AsideFeaturedPosts';
// import AsideRecentPosts from '@/components/AsideRecentPosts';

import PostInfo from './components/PostInfo';
import LastUpdated from './components/LastUpdated';

const styleWidgetArea = {
  display: 'flex',
  flexDirection: 'column',
};

const PostTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    post: { title, headline, cover, breadcrumbs, datePublished, dateModified, author, html, timeToRead },
  } = data;

  return (
    <Layout
      title={title}
      headline={headline}
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <PostInfo author={author} datePublished={datePublished} timeToRead={timeToRead} />
      <InnerAsideLayout
        cover={cover}
        html={html}
        aside={
          <aside css={styleWidgetArea}>
            <AsideServices mainNav={mainNav} />
            <AsideFeaturedPosts items={data.featuredPosts.edges} />
            {/* <AsideRecentPosts items={data.recentPosts.edges} /> */}
          </aside>
        }
      />
      {dateModified && ((datePublished && dateModified !== datePublished) || !datePublished) && <LastUpdated date={dateModified} />}
    </Layout>
  );
};

export default PostTemplate;

export const Head = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    post: { metaTitle, metaDescription, noindex, breadcrumbs, headline, datePublished, dateModified, author, cover },
    socialLinks,
    address,
  } = data;

  return (
    <SEO
      locale={locale}
      title={metaTitle}
      description={metaDescription}
      headline={headline}
      pathname={pathname}
      noindex={noindex}
      breadcrumbs={breadcrumbs}
      datePublished={datePublished}
      dateModified={dateModified}
      author={author}
      pageType="BlogPosting"
      imgPath={cover?.sm?.publicURL}
      socialLinksData={socialLinks}
      orgAddress={address}
    />
  );
};

export const postQuery = graphql`
  query PostQuery($id: String!, $locale: String!) {
    post: mdPost(id: { eq: $id }) {
      ...MdPostFragment
    }
    recentPosts: allMdPost(sort: { datePublished: DESC }, limit: 10, filter: { locale: { eq: $locale } }) {
      edges {
        node {
          ...MdPostShortInfoFragment
        }
      }
    }
    featuredPosts: allMdPost(sort: { datePublished: DESC }, limit: 10, filter: { featured: { eq: true }, locale: { eq: $locale } }) {
      edges {
        node {
          ...MdPostShortInfoFragment
        }
      }
    }
    address: address(locale: { eq: $locale }) {
      ...AddressFragment
    }
    mainNav: allMainNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
          submenu {
            title
            to
          }
        }
      }
    }
    footerNav: allFooterNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
        }
      }
    }
    socialLinks: allSocialLink(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allTranslation(filter: { locale: { eq: $locale } }, limit: 1000) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
