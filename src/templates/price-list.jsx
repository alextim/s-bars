import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';

import Layout from '../components/Layout/SimpleLayoutWithHeader';
import Sections from '../components/Sections';

const PageTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, cover, noindex, sections },
    html,
  } = data.page;
  // eslint-disable-next-line no-console
  console.log(data.priceList);
  return (
    <Layout
      title={title}
      subtitle={description}
      cover={cover}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      {data.priceList &&
        data.priceList.edges.map(({ node: { sectionTitle, headInfo, groups } }, i) => (
          <div key={i}>
            <div>{sectionTitle}</div>
            {headInfo && (
              <div>
                <div>{headInfo.price.title}</div>

                <div>
                  {headInfo.price && headInfo.price.subtitles && (
                    <div>
                      {headInfo.price.subtitles.map((subtitle, j) => (
                        <div key={j}>{subtitle}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  {groups.map(({ groupTitle, rows }, k) => (
                    <div key={k}>
                      {groupTitle}
                      {rows.map((row, l) => (
                        <div key={l}>
                          {row.map((el, m) => (
                            <div key={m}>{el}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}

      <Sections data={sections} />
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PriceListQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...PageFragment
    }
    priceList: allYaml(
      filter: { fields: { type: { eq: "price-list" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          sectionTitle
          headInfo {
            name
            price {
              title
              subtitles
            }
            description
          }
          groups {
            groupTitle
            rows
          }
        }
      }
    }
    address: yaml(fields: { type: { eq: "address" }, locale: { eq: $locale } }) {
      ...AddressFragment
    }
    mainNav: allYaml(filter: { fields: { type: { eq: "main-nav" }, locale: { eq: $locale } } }) {
      edges {
        node {
          title
          fields {
            to
            submenu {
              title
              to
            }
          }
        }
      }
    }
    footerNav: allYaml(
      filter: { fields: { type: { eq: "footer-nav" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          title
          fields {
            to
          }
        }
      }
    }
    socialLinks: allYaml(
      filter: { fields: { type: { eq: "social-links" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allYaml(
      filter: { fields: { type: { eq: "translations" }, locale: { eq: $locale } } }
      limit: 1000
    ) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
