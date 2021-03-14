const createSiteMap = require('./createSiteMap');
const createImageSiteMap = require('./createImageSiteMap');

const withOptions = require('./plugin-options');

const wrapper = require('../../at-site/src/gatsby/helpers/promise-wrapper');

module.exports = async ({ graphql, reporter }, pluginOptions) => {
  reporter.info('at-sitemap: started...');

  const options = withOptions(pluginOptions);

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
        pages: allMdPage {
          edges {
            node {
              slug
              locale
              cover {
                title
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
                  title
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
                    title
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
              htmlAst
            }
          }
        }
        posts: allMdPost {
          edges {
            node {
              slug
              locale
              cover {
                title
                alt
                xl {
                  publicURL
                }
                sm {
                  publicURL
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

  const pages = result.data.pages.edges.filter(({ node: { slug } }) => !inExcludedPaths(slug));
  const posts = result.data.posts.edges.filter(({ node: { slug } }) => !inExcludedPaths(slug));

  const allPages = [...pages, ...posts];

  if (!allPages.length) {
    reporter.info('No data for sitemap');
    return;
  }
  reporter.info(`Posts: ${posts.length}`);
  reporter.info(`Pages: ${pages.length}`);

  createSiteMap(allPages, reporter, options, siteUrl, locales);
  createImageSiteMap(allPages, reporter, options, siteUrl);
};
