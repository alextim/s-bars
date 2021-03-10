/* eslint-disable no-console */
const wrapper = require('../../../at-site/src/gatsby/helpers/promise-wrapper');

const i18n = require('../../../../src/i18n/i18n');
// const { createTagPages, createCategoryPages, createYearPages } = require('./create-pages-utils');

/**
 * keep it!
 */
/*

const compString = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

const compNum = (a, b) => a - b;

const map2Object = (m, comp, prefix, locale) =>
  [...m]
    .map(([key]) => key)
    .sort(comp)
    .reduce((acc, key) => {
      // eslint-disable-next-line no-param-reassign
      acc[key] = {
        to: i18n.localizePath(`/${prefix}/${_.kebabCase(key)}`, locale),
        count: m.get(key),
      };
      return acc;
    }, {});

*/

module.exports = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions;

  const { cardsPerPage, blogPath, templatesDir } = pluginOptions;
  // const { CREATE_TAG_PAGES, CREATE_CATEGORY_PAGES, CREATE_YEAR_PAGES } = pluginOptions;

  const postListTemplate = require.resolve(`${templatesDir}post-list.jsx`);
  const postDefaultTemplate = require.resolve(`${templatesDir}post.jsx`);

  /*
  const categoryTemplate = require.resolve(`${templatesDir}category.jsx`);
  const tagTemplate = require.resolve(`${templatesDir}tags.jsx`);
  const yearTemplate = require.resolve(`${templatesDir}years.jsx`);

  const categoryListTemplate = require.resolve(`${templatesDir}category-list.jsx`);
  const tagListTemplate = require.resolve(`${templatesDir}tag-list.jsx`);
  const yearListTemplate = require.resolve(`${templatesDir}year-list.jsx`);
  */

  console.log('=====createPosts=====');
  const result = await wrapper(
    graphql(`
      {
        site {
          siteMetadata {
            siteUrl
            locales {
              code
            }
          }
        }
        posts: allMdPost(limit: 1000, sort: { fields: [datePublished], order: DESC }) {
          edges {
            node {
              id
              template
              tags
              category
              slug
              locale
              year
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

  result.data.site.siteMetadata.locales.forEach(({ code: locale }) => {
    console.log(`\n-------- Locale=${locale} --------`);

    /**
     * Posts
     *
     */
    const posts = result.data.posts.edges.filter(({ node }) => node.locale === locale);

    if (posts.length === 0) {
      console.warn('\nNo posts');
    } else {
      /**
       * keep it
       * */
      /*
      const tagMap = new Map();
      const categoryMap = new Map();
      const yearMap = new Map();
      */

      console.log(`\nMd post: ${posts.length}`);
      console.log('---------------');
      posts.forEach(
        ({
          node: {
            id,
            /**
             * keep it
             * */
            /*
            category, tags,  year,
            */
            slug,
          },
        }) => {
          /**
           * keep it
           *  */
          /*
          if (CREATE_TAG_PAGES && tags) {
            tags.forEach((tag) => {
              if (tagMap.get(tag)) {
                tagMap.set(tag, tagMap.get(tag) + 1);
              } else {
                tagMap.set(tag, 1);
              }
            });
          }

          if (CREATE_CATEGORY_PAGES && category) {
            category.forEach((cat) => {
              if (categoryMap.get(cat)) {
                categoryMap.set(cat, categoryMap.get(cat) + 1);
              } else {
                categoryMap.set(cat, 1);
              }
            });
          }

          if (CREATE_YEAR_PAGES && year) {
            if (yearMap.get(year)) {
              yearMap.set(year, yearMap.get(year) + 1);
            } else {
              yearMap.set(year, 1);
            }
          }
          */

          console.log('pagepath=', slug);
          createPage({
            path: slug,
            component: postDefaultTemplate,
            context: {
              id,
              locale,
            },
          });
        },
      );

      /**
       *  keep it
       *
       * */
      /*
      const categories = map2Object(categoryMap, compString, 'category', locale);
      const tags = map2Object(tagMap, compString, 'tags', locale);
      const years = map2Object(yearMap, compNum, 'years', locale);
      let numPages = Math.ceil(posts.length / cardsPerPage);
      */

      const numPages = Math.ceil(posts.length / cardsPerPage);

      console.log(`\nPost List: numPages=${numPages}`);
      console.log('---------------');
      for (let i = 0; i < numPages; i += 1) {
        const path = i18n.localizePath(i === 0 ? blogPath : `${blogPath}${i + 1}/`, locale);
        console.log('pagepath=', path);
        createPage({
          path,
          component: postListTemplate,
          context: {
            locale,
            limit: cardsPerPage,
            skip: i * cardsPerPage,
            numPages,
            currentPage: i + 1,
            /**
             *  keep it
             *
             * */
            /*
            categories,
            tags,
            years,
            */
          },
        });
      }

      /**
       * keep it!
       */
      /*
      if (CREATE_CATEGORY_PAGES) {
        console.log('\n');
        console.log('Category List: pagepath=', i18n.localizePath('/category', locale));
        createPage({
          path: i18n.localizePath('/category/', locale),
          component: categoryListTemplate,
          context: {
            locale,
            categories,
          },
        });
      }

      if (CREATE_TAG_PAGES) {
        console.log('Tag List: pagepath=', i18n.localizePath('/tags', locale));
        createPage({
          path: i18n.localizePath('/tags/', locale),
          component: tagListTemplate,
          context: {
            locale,
            tags,
          },
        });
      }

      if (CREATE_YEAR_PAGES) {
        console.log('Year List: pagepath=', i18n.localizePath('/years', locale));
        createPage({
          path: i18n.localizePath('/years/', locale),
          component: yearListTemplate,
          context: {
            locale,
            years,
          },
        });
      }

      if (CREATE_CATEGORY_PAGES) {
        console.log('\nCategory pages');
        console.log('---------------');
        categoryMap.forEach((count, category) => {
          numPages = Math.ceil(count / cardsPerPage);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0
                ? `/category/${_.kebabCase(category)}/`
                : `/category/${_.kebabCase(category)}/${i + 1}/`,
              locale,
            );
            console.log('pagepath=', path);
            createPage({
              path,
              component: categoryTemplate,
              context: {
                locale,
                category,
                limit: cardsPerPage,
                skip: i * cardsPerPage,
                numPages,
                currentPage: i + 1,
                categories,
                tags,
                years,
              },
            });
          }
        });
      }

      if (CREATE_TAG_PAGES) {
        console.log('\nTag pages');
        console.log('---------------');
        tagMap.forEach((count, tag) => {
          numPages = Math.ceil(count / cardsPerPage);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0 ? `/tags/${_.kebabCase(tag)}/` : `/tags/${_.kebabCase(tag)}/${i + 1}/`,
              locale,
            );
            console.log('pagepath=', path);
            createPage({
              path,
              component: tagTemplate,
              context: {
                locale,
                tag,
                limit: cardsPerPage,
                skip: i * cardsPerPage,
                numPages,
                currentPage: i + 1,
                categories,
                tags,
                years,
              },
            });
          }
        });
      }

      if (CREATE_YEAR_PAGES) {
        console.log('\nYear pages');
        console.log('---------------');
        yearMap.forEach((count, year) => {
          numPages = Math.ceil(count / cardsPerPage);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0 ? `/years/${_.kebabCase(year)}/` : `/years/${_.kebabCase(year)}/${i + 1}/`,
              locale,
            );
            console.log('pagepath=', path);
            createPage({
              path,
              component: yearTemplate,
              context: {
                locale,
                year,
                limit: cardsPerPage,
                skip: i * cardsPerPage,
                numPages,
                currentPage: i + 1,
                categories,
                tags,
                years,
              },
            });
          }
        });
      }
      */
    }
  });
};
