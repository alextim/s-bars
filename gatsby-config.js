require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const i18n = require('./src/i18n/i18n');
const config = require('./config/website');
const locales = require('./config/locales');

const manifestIconSrc = `${__dirname}/src/assets/images/icon.png`;

const { contentDir } = config;

const CSP = {
  'default-src': "'self'",
  'prefetch-src': "'self'",
  'connect-src': "'self' *.google-analytics.com",
  'manifest-src': "'self'",
  'style-src': "'self' 'unsafe-inline'",
  'font-src': "'self' data:",
  'base-uri': "'none'",
  'frame-src': 'https://www.youtube.com *.google.com',
  'frame-ancestors': "'none'",
  'form-action': "'none'",
  'script-src': "'self' *.google-analytics.com maps.googleapis.com 'unsafe-inline'",
  'img-src':
    "data: 'self' *.google-analytics.com maps.gstatic.com *.googleapis.com *.ggpht *.ytimg.com",
  'object-src': "'none'",
};

const getContentSecurityPolicy = () =>
  Object.keys(CSP).reduce((acc, curr) => `${acc}${acc ? '; ' : ''}${curr} ${CSP[curr]}`, '');

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    locales: i18n.localeCodes.map((code) => ({ code, ...locales[code] })),
    defaultLang: i18n.defaultLang,
  },
  plugins: [
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/${contentDir}/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/${contentDir}/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'object-types',
        path: `${__dirname}/${contentDir}/object-types`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'services',
        path: `${__dirname}/${contentDir}/services`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/${contentDir}/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Yaml', // a fixed string
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-remark-images',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          /**
           * gatsby-remark-relative-images must go before gatsby-remark-images
           *
           *  */
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              quality: 50,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    /*
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        anonymize: true,
        allowLinker: true,
        head: false,
        respectDNT: false,
      },
    },
        */
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: i18n.defaultLocale.siteTitle,
        short_name: i18n.defaultLocale.siteShortName,
        lang: i18n.defaultLang,
        description: i18n.defaultLocale.siteDescription,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: manifestIconSrc,
        localize: i18n.localeCodes
          .filter((code) => code !== i18n.defaultLang)
          .map((code) => {
            const { htmlLang, siteTitle, siteShortName, siteDescription } = i18n.locales[code];
            return {
              start_url: `${i18n.localizePath('/', code)}/`,
              lang: htmlLang,
              name: siteTitle,
              short_name: siteShortName,
              description: siteDescription,
            };
          }),
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
          options: {
            props: {
              className: 'fa',
            },
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx'],
        exclude: ['node_modules', '.cache', 'public', '.netlify', '.vscode'],
        // Any eslint-webpack-plugin options below
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-remove-serviceworker',
    {
      resolve: 'gatsby-plugin-portal',
      options: {
        key: 'portal',
        id: 'portal',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
        headers: {
          '/*': [
            `Content-Security-Policy: ${getContentSecurityPolicy()}`,
            // 'X-Robots-Tag: noindex, nofollow',
          ],
          '/assets/*': ['Cache-Control: public, max-age=31536000, immutable'],
          '/404.html': ['Cache-Control: max-age=300'],
          '/ru/404.html': ['Cache-Control: max-age=300'],
        },
      },
    },
    // 'gatsby-plugin-sass',
    'gatsby-plugin-remove-generator',
    // 'gatsby-plugin-webpack-bundle-analyser-v2',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl },
                },
                allMarkdownRemark,
              },
            }) => {
              return allMarkdownRemark.edges.map(
                ({ node: { frontmatter, excerpt, html, fields } }) => {
                  return {
                    ...frontmatter,
                    description: excerpt,
                    date: frontmatter.datePublished,
                    url: siteUrl + fields.slug,
                    guid: siteUrl + fields.slug,
                    custom_elements: [{ 'content:encoded': html }],
                  };
                },
              );
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 30,
                  sort: { order: DESC, fields: [frontmatter___datePublished] },
                  filter: { fields: { type: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug,
                      }
                      frontmatter {
                        title
                        datePublished
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'S-Bars RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'at-site',
      options: {
        templatesDir: `${__dirname}/src${config.templatesDir}`,
        excludedSlugs: [
          'blog',
          'category',
          'category-list',
          'tags',
          'tag-list',
          'years',
          'year-list',
        ],
      },
    },
    {
      resolve: 'at-blog',
      options: {
        templatesDir: `${__dirname}/src${config.templatesDir}`,
        cardsPerPage: config.cardsPerPage,
        blogPath: config.blogPath,
        CREATE_TAG_PAGES: false,
        CREATE_CATEGORY_PAGES: false,
        CREATE_YEAR_PAGES: false,
      },
    },
    {
      resolve: 'at-sitemap',
      options: {
        ignoreImagesWithoutAlt: false,
      },
    },
  ],
};
