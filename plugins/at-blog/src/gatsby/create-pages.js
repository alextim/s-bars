/* eslint-disable no-console */
const wrapper = require('../../../at-site/src/gatsby/helpers/promise-wrapper');
const withOptions = require('./plugin-options');
const i18n = require('../../../../src/i18n/i18n');
// const { createTagPages, createCategoryPages, createYearPages } = require('./create-pages-utils');

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

const map2Object = (m) =>
  [...m]
    .map(([to]) => to)
    .sort(compString)
    .reduce((acc, to) => {
      // eslint-disable-next-line no-param-reassign
      acc[to] = {
        title: m.get(to).title,
        count: m.get(to).count,
      };
      return acc;
    }, {});

const yearMap2Object = (m, prefix, locale) =>
  [...m]
    .map(([key]) => key)
    .sort(compNum)
    .reduce((acc, key) => {
      // eslint-disable-next-line no-param-reassign
      acc[key] = {
        to: i18n.localizePath(`/${prefix}/${key}/`, locale),
        count: m.get(key),
      };
      return acc;
    }, {});

module.exports = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions;

  const {
    cardsPerPage,
    blogPath,
    categoryPath,
    tagsPath,
    yearsPath,
    templatesDir,
    CREATE_TAG_PAGES,
    CREATE_CATEGORY_PAGES,
    CREATE_YEAR_PAGES,
  } = withOptions(pluginOptions);

  const postListTemplate = require.resolve(`${templatesDir}post-list.jsx`);
  const postDefaultTemplate = require.resolve(`${templatesDir}post.jsx`);

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
              tags {
                title
                to
              }
              category {
                title
                to
              }
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
      const tagMap = new Map();
      const categoryMap = new Map();
      const yearMap = new Map();

      console.log(`\nMd posts: ${posts.length}`);
      console.log('---------------');
      posts.forEach(({ node: { id, category, tags, year, slug } }) => {
        if (CREATE_TAG_PAGES && tags) {
          tags.forEach(({ title, to }) => {
            if (tagMap.get(to)) {
              const o = tagMap.get(to);
              o.count += 1;
              tagMap.set(to, o);
            } else {
              tagMap.set(to, { title, count: 1 });
            }
          });
        }

        if (CREATE_CATEGORY_PAGES && category) {
          category.forEach(({ title, to }) => {
            if (categoryMap.get(to)) {
              const o = categoryMap.get(to);
              o.count += 1;
              categoryMap.set(to, o);
            } else {
              categoryMap.set(to, { title, count: 1 });
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

        console.log('pagepath=', slug);
        createPage({
          path: slug,
          component: postDefaultTemplate,
          context: {
            id,
            locale,
          },
        });
      });

      const categories = map2Object(categoryMap);
      const tags = map2Object(tagMap);
      const years = yearMap2Object(yearMap, 'years', locale);

      {
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
              categories,
              tags,
              years,
            },
          });
        }
      }

      if (CREATE_CATEGORY_PAGES) {
        const categoryListTemplate = require.resolve(`${templatesDir}category-list.jsx`);
        const categoryTemplate = require.resolve(`${templatesDir}category.jsx`);

        {
          const path = i18n.localizePath(categoryPath, locale);
          console.log('\nCategory List: pagepath=', path);
          createPage({
            path,
            component: categoryListTemplate,
            context: {
              locale,
              categories,
            },
          });
        }

        console.log('\nCategory pages');
        console.log('---------------');
        categoryMap.forEach(({ title: category, count }, to) => {
          const numPages = Math.ceil(count / cardsPerPage);
          for (let i = 0; i < numPages; i++) {
            const path = i === 0 ? to : `${to}${i + 1}/`;
            console.log('pagepath=', path);
            createPage({
              path,
              component: categoryTemplate,
              context: {
                locale,
                category,
                subpath: to,
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
        const tagListTemplate = require.resolve(`${templatesDir}tag-list.jsx`);
        const tagTemplate = require.resolve(`${templatesDir}tags.jsx`);

        {
          const path = i18n.localizePath(tagsPath, locale);
          console.log('\nTag List: pagepath=', path);
          createPage({
            path,
            component: tagListTemplate,
            context: {
              locale,
              tags,
            },
          });
        }
        console.log('\nTag pages');
        console.log('---------------');
        tagMap.forEach(({ title: tag, count }, to) => {
          const numPages = Math.ceil(count / cardsPerPage);
          for (let i = 0; i < numPages; i += 1) {
            const path = i === 0 ? to : `${to}${i + 1}/`;
            console.log('pagepath=', path);
            createPage({
              path,
              component: tagTemplate,
              context: {
                locale,
                tag,
                subpath: to,
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
        const yearListTemplate = require.resolve(`${templatesDir}year-list.jsx`);
        const yearTemplate = require.resolve(`${templatesDir}years.jsx`);

        {
          const path = i18n.localizePath(yearsPath, locale);
          console.log('\nYear List: pagepath=', path);
          createPage({
            path,
            component: yearListTemplate,
            context: {
              locale,
              years,
            },
          });
        }

        console.log('\nYear pages');
        console.log('---------------');
        yearMap.forEach((count, year) => {
          const numPages = Math.ceil(count / cardsPerPage);
          for (let i = 0; i < numPages; i += 1) {
            const path = i18n.localizePath(
              i === 0 ? `${yearsPath}${year}/` : `${yearsPath}${year}/${i + 1}/`,
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
    }
  });
};
