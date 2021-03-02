/* eslint-disable no-console */
/**
 * const _ = require('lodash');
 */
const wrapper = require('./promise-wrapper');

const TEMPLATES_DIR = '../templates/';

const { POSTS_PER_PAGE, POSTS_PATH } = require('../../config/website');

// const { createTagPages, createCategoryPages, createYearPages } = require('./create-pages-utils');
const i18n = require('../i18n/i18n');

const pageDefaultTemplate = require.resolve(`${TEMPLATES_DIR}page.jsx`);

const serviceDefaultTemplate = require.resolve(`${TEMPLATES_DIR}service.jsx`);
const objectTypeDefaultTemplate = require.resolve(`${TEMPLATES_DIR}object-type.jsx`);

const postListTemplate = require.resolve(`${TEMPLATES_DIR}post-list.jsx`);
const postDefaultTemplate = require.resolve(`${TEMPLATES_DIR}post.jsx`);

/**
 * keep it!
 */
/*
const CREATE_TAG_PAGES = false;
const CREATE_CATEGORY_PAGES = false;
const CREATE_YEAR_PAGES = false;

const categoryTemplate = require.resolve(`${TEMPLATES_DIR}category.jsx`);
const tagTemplate = require.resolve(`${TEMPLATES_DIR}tags.jsx`);
const yearTemplate = require.resolve(`${TEMPLATES_DIR}years.jsx`);

const categoryListTemplate = require.resolve(`${TEMPLATES_DIR}category-list.jsx`);
const tagListTemplate = require.resolve(`${TEMPLATES_DIR}tag-list.jsx`);
const yearListTemplate = require.resolve(`${TEMPLATES_DIR}year-list.jsx`);

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

const getTemplate = (template) => {
  if (template) {
    const path = `${TEMPLATES_DIR}${template}.jsx`;
    try {
      return require.resolve(path);
    } catch {
      console.warn(`template "${path}" is not exist`);
    }
  }
  return null;
};

const slug2template = (slug) => i18n.purePath(slug).substring(1);

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  console.log('=====createPages=====');
  const result = await wrapper(
    graphql(`
      {
        pages: allMarkdownRemark(limit: 100, filter: { fields: { type: { eq: "page" } } }) {
          edges {
            node {
              id
              frontmatter {
                template
              }
              fields {
                slug
                locale
              }
            }
          }
        }
        objectTypes: allMarkdownRemark(
          limit: 100
          filter: { fields: { type: { eq: "object-type" } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                template
              }
              fields {
                slug
                locale
              }
            }
          }
        }
        services: allMarkdownRemark(limit: 100, filter: { fields: { type: { eq: "service" } } }) {
          edges {
            node {
              id
              frontmatter {
                template
              }
              fields {
                slug
                locale
              }
            }
          }
        }
        posts: allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { state: { eq: "published" } }, fields: { type: { eq: "post" } } }
          sort: { fields: [frontmatter___datePublished], order: DESC }
        ) {
          edges {
            node {
              id
              frontmatter {
                template
                tags
                category
              }
              fields {
                slug
                locale
                year
              }
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
  const prohibitedSlugs = [
    'blog',
    'category',
    'category-list',
    'tags',
    'tag-list',
    'years',
    'year-list',
  ];
  i18n.localeCodes.forEach((locale) => {
    console.log(`\n-------- Locale=${locale} --------`);

    /**
     * Pages
     *
     */
    const pages = result.data.pages.edges.filter(
      ({ node: { fields } }) =>
        fields.locale === locale && !prohibitedSlugs.some((s) => fields.slug.includes(s)),
    );
    if (pages.length === 0) {
      console.warn('\nNo pages');
    } else {
      console.log(`\nMd pages: ${pages.length}`);
      console.log('---------------');
      pages.forEach(
        ({
          node: {
            id,
            frontmatter: { template },
            fields: { slug },
          },
        }) => {
          console.log('pagepath=', slug);
          createPage({
            path: slug,
            component: getTemplate(template || slug2template(slug)) || pageDefaultTemplate,
            context: {
              id,
              locale,
            },
          });
        },
      );
    }

    /**
     * Services
     *
     */
    const services = result.data.services.edges.filter(
      ({ node: { fields } }) =>
        fields.locale === locale && !prohibitedSlugs.some((s) => fields.slug.includes(s)),
    );
    if (services.length === 0) {
      console.warn('\nNo services');
    } else {
      console.log(`\nMd services: ${services.length}`);
      console.log('---------------');
      services.forEach(
        ({
          node: {
            id,
            fields: { slug },
          },
        }) => {
          console.log('pagepath=', slug);
          createPage({
            path: slug,
            component: serviceDefaultTemplate,
            context: {
              id,
              locale,
            },
          });
        },
      );
    }

    /**
     * Object Types
     *
     */
    const objectTypes = result.data.objectTypes.edges.filter(
      ({ node: { fields } }) =>
        fields.locale === locale && !prohibitedSlugs.some((s) => fields.slug.includes(s)),
    );
    if (objectTypes.length === 0) {
      console.warn('\nNo object types');
    } else {
      console.log(`\nMd object types: ${objectTypes.length}`);
      console.log('---------------');
      objectTypes.forEach(
        ({
          node: {
            id,
            fields: { slug },
          },
        }) => {
          console.log('pagepath=', slug);
          createPage({
            path: slug,
            component: objectTypeDefaultTemplate,
            context: {
              id,
              locale,
            },
          });
        },
      );
    }

    /**
     * Posts
     *
     */
    const posts = result.data.posts.edges.filter(
      ({ node: { fields } }) => fields.locale === locale,
    );

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
            frontmatter: { category, tags },
            fields: { slug, year },
            */
            fields: { slug },
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
      let numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
      */

      const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

      console.log(`\nPost List: numPages=${numPages}`);
      console.log('---------------');
      for (let i = 0; i < numPages; i += 1) {
        const path = i18n.localizePath(i === 0 ? POSTS_PATH : `${POSTS_PATH}/${i + 1}`, locale);
        console.log('pagepath=', path);
        createPage({
          path,
          component: postListTemplate,
          context: {
            locale,
            limit: POSTS_PER_PAGE,
            skip: i * POSTS_PER_PAGE,
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
          path: i18n.localizePath('/category', locale),
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
          path: i18n.localizePath('/tags', locale),
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
          path: i18n.localizePath('/years', locale),
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
          numPages = Math.ceil(count / POSTS_PER_PAGE);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0
                ? `/category/${_.kebabCase(category)}`
                : `/category/${_.kebabCase(category)}/${i + 1}`,
              locale,
            );
            console.log('pagepath=', path);
            createPage({
              path,
              component: categoryTemplate,
              context: {
                locale,
                category,
                limit: POSTS_PER_PAGE,
                skip: i * POSTS_PER_PAGE,
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
          numPages = Math.ceil(count / POSTS_PER_PAGE);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0 ? `/tags/${_.kebabCase(tag)}` : `/tags/${_.kebabCase(tag)}/${i + 1}`,
              locale,
            );
            console.log('pagepath=', path);
            createPage({
              path,
              component: tagTemplate,
              context: {
                locale,
                tag,
                limit: POSTS_PER_PAGE,
                skip: i * POSTS_PER_PAGE,
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
          numPages = Math.ceil(count / POSTS_PER_PAGE);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0 ? `/years/${_.kebabCase(year)}` : `/years/${_.kebabCase(year)}/${i + 1}`,
              locale,
            );
            console.log('pagepath=', path);
            createPage({
              path,
              component: yearTemplate,
              context: {
                locale,
                year,
                limit: POSTS_PER_PAGE,
                skip: i * POSTS_PER_PAGE,
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
