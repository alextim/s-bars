require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const path = require('path');
const getCSP = require('@alextim/csp');

const i18n = require('./src/i18n/i18n');
const config = require('./s-bars.content/config/website');
const locales = require('./s-bars.content/config/locales');

const manifestIconSrc = path.join(__dirname, 'src', 'assets', 'images', 'icon.png');

const { contentDir, postDirs, pageDirs, cardsPerPage } = config;

const toBoolean = (x) => {
  if (!x) {
    return false;
  }
  if (typeof x === 'boolean') {
    return x;
  }
  if (typeof x === 'number') {
    return !!x;
  }
  return typeof x === 'string' && x.trim().toLowerCase() === 'true';
};

const noIndex = toBoolean(process.env.NO_INDEX);

// eslint-disable-next-line no-console
console.log(`Robots and indexing: ${noIndex ? 'DISABLED' : 'ENABLED'}`);

const headerForAll = [`Content-Security-Policy: ${getCSP(!!config.googleAnalyticsID, true, true)}`];
if (noIndex) {
  headerForAll.push('X-Robots-Tag: noindex, nofollow');
}

const headers = {
  '/*': headerForAll,
  '/assets/*': ['Cache-Control: public, max-age=31536000, immutable'],
  '/404.html': ['Cache-Control: max-age=300'],
  '/ru/404.html': ['Cache-Control: max-age=300'],
};

const allDirs = { ...pageDirs, ...postDirs };
const pageSources = Object.keys(allDirs).map((name) => ({
  resolve: 'gatsby-source-filesystem',
  options: {
    name,
    path: path.join(__dirname, contentDir, allDirs[name]),
  },
}));

const plugins = [
  'gatsby-plugin-image',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: path.join(__dirname, contentDir, 'data'),
    },
  },
  ...pageSources,
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
            /**
             * 1280px - current layout width
             * 896px - content column
             * for 100% width
             *
             */
            maxWidth: 896,
            quality: 50,
          },
        },
      ],
    },
  },
  'gatsby-plugin-react-helmet',
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
      exclude: ['node_modules', '.cache', 'public', '.netlify', '.vscode', '.husky'],
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
      headers,
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
              posts,
            },
          }) =>
            posts.edges.map(({ node }) => ({
              title: node.title,
              description: node.excerpt,
              date: node.datePublished,
              url: siteUrl + node.slug,
              guid: siteUrl + node.slug,
              custom_elements: [{ 'content:encoded': node.html }],
            })),
          query: `
              {
                posts: allMdPost(
                  limit: 30,
                  sort: { order: DESC, fields: [datePublished] },
                ) {
                  edges {
                    node {
                      title
                      excerpt
                      datePublished
                      slug,
                      html
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: `${i18n.defaultLocale.siteShortName} RSS Feed`,
        },
      ],
    },
  },
  {
    resolve: '@alextim/at-site-core',
    options: {
      templatesDir: path.join(__dirname, 'src', config.templatesDir),
      pageDirs,
      i18n,
      noIndex,
    },
  },
  {
    resolve: '@alextim/at-blog',
    // resolve: 'at-blog',
    options: {
      templatesDir: path.join(__dirname, 'src', config.templatesDir, 'blog'),
      cardsPerPage,
      postDirs,
      i18n,
      noIndex,
    },
  },
  {
    resolve: '@alextim/at-sitemap',
    // resolve: 'at-sitemap',
    options: {
      createRobotsTxt: true,
      ignoreImagesWithoutAlt: false,
      noIndex,
    },
  },
];

if (config.googleAnalyticsID) {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: config.googleAnalyticsID,
      anonymize: true,
      allowLinker: true,
      head: false,
      respectDNT: false,
    },
  });
}

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    locales: i18n.localeCodes.map((code) => ({ code, ...locales[code] })),
    defaultLang: i18n.defaultLang,
  },
  plugins,
};
