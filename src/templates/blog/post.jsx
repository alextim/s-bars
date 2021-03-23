/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql /* , Link */ } from 'gatsby';

import SEO from '../../components/SEO';
import Layout from '../../components/Layout/Layout';

import AsideServices from '../../components/AsideServices';
import AsideFeaturedPosts from '../../components/AsideFeaturedPosts';
// import AsideRecentPosts from '../../components/AsideRecentPosts';

import InnerAsideLayout from '../../components/InnerAsideLayout';
import PostTags from '../../components/blog/PostTags';
import LastUpdated from '../../components/blog/LastUpdated';

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
    post: {
      title,
      metaTitle,
      headline,
      metaDescription,
      cover,
      noindex,
      datePublished,
      dateModified,
      tags,
      html,
      locale,
      slug,
    },
  } = data;

  return (
    <Layout
      title={title}
      subtitle={headline}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        headline={headline}
        pathname={slug}
        noindex={noindex}
        datePublished={datePublished}
        dateModified={dateModified}
        pageType="BlogPosting"
        imgPath={cover?.sm?.publicURL}
      />
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
      >
        <PostTags tags={tags} />
        <LastUpdated date={dateModified} />
      </InnerAsideLayout>
    </Layout>
  );
};

export default PostTemplate;

export const postQuery = graphql`
  query PostQuery($id: String!, $locale: String!) {
    post: mdPost(id: { eq: $id }) {
      ...MdPostFragment
    }
    recentPosts: allMdPost(
      sort: { fields: [datePublished], order: DESC }
      limit: 10
      filter: { locale: { eq: $locale } }
    ) {
      edges {
        node {
          ...MdPostShortInfoFragment
        }
      }
    }
    featuredPosts: allMdPost(
      sort: { fields: [datePublished], order: DESC }
      limit: 10
      filter: { featured: { eq: true }, locale: { eq: $locale } }
    ) {
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
