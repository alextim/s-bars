/* eslint-disable no-console */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const i18n = require('./src/i18n/i18n');
const config = require('./config/website');

const manifestIconSrc = `${__dirname}/src/assets/images/icon.png`;

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'object-types',
        path: `${__dirname}/content/object-types`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
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
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        // exclude: [],
        /**
         *
         * Fix to exclude all 404 pages
         *
         * gatsby-plugin-sitemap ^2.4.7 excludes only default /404
         *
         * not working
         * exclude: ['/en/404', '/ru/404']
         * exclude: ['/ * /404']
         * exclude: ['*404*']
         *
         *  */
        // https://www.digitalocean.com/community/tutorials/building-a-custom-sitemap-for-your-gatsbyjs-site
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes
            .filter((node) => !node.path.includes('404'))
            .map((node) => ({
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: 'daily',
              priority: 0.7,
            })),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        /*
        trackingId: config.googleAnalyticsID,
        anonymize: true,
        allowLinker: true,
        head: false,
        respectDNT: false,
        */
      },
    },
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
    'gatsby-plugin-webpack-bundle-analyser-v2',

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
  ],
};
