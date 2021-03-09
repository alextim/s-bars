const defaultOptions = require('./default-options');
const createSiteMap = require('./createSiteMap');
const createImageSiteMap = require('./createImageSiteMap');

const wrapper = require('../../at-site/src/gatsby/helpers/promise-wrapper');

module.exports = async ({ graphql, reporter }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const result = await wrapper(
    graphql(`
      {
        site {
          siteMetadata {
            siteUrl
            locales {
              code
              htmlLang
            }
          }
        }
        allMarkdownRemark(filter: { frontmatter: { state: { ne: "draft" } } }) {
          edges {
            node {
              fields {
                type
                slug
                locale
              }
              frontmatter {
                state
                cover {
                  alt
                  xl {
                    publicURL
                  }
                  sm {
                    publicURL
                  }
                }
                sections {
                  image {
                    alt
                    xl {
                      publicURL
                    }
                    sm {
                      publicURL
                    }
                  }
                  items {
                    image {
                      alt
                      sm {
                        publicURL
                      }
                      xl {
                        publicURL
                      }
                    }
                  }
                }
              }
              htmlAst
            }
          }
        }
      }
    `),
  );
  if (result.errors) {
    reporter.panic(result.errors);
    return;
  }
  const { siteUrl, locales } = result.data.site.siteMetadata;

  const inExcludedPaths = (slug) =>
    options.excludePaths.some((exPath) => slug.indexOf(exPath) !== -1);

  const allPages = result.data.allMarkdownRemark.edges.filter(
    ({
      node: {
        fields: { slug },
      },
    }) => !inExcludedPaths(slug),
  );
  reporter.info(`Generating sitemap for ${allPages.length} pages...`);

  createImageSiteMap(allPages, reporter, options, siteUrl);
  createSiteMap(allPages, reporter, options, siteUrl, locales);
};
