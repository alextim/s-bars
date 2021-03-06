/* eslint-disable no-console */

const wrapper = require('./helpers/promise-wrapper');

const i18n = require('../../../../src/i18n/i18n');

const slug2template = (slug) => {
  const pureSlug = i18n.pureSlug(slug);
  return pureSlug === '/' ? undefined : pureSlug.toString();
};

module.exports = async ({ graphql, actions, reporter }, pluginOptions) => {
  const { createPage } = actions;

  const { templatesDir, excludedSlugs } = pluginOptions;
  const pageDefaultTemplate = require.resolve(`${templatesDir}page.jsx`);

  const getTemplate = (template) => {
    if (template) {
      const path = `${templatesDir}${template}.jsx`;
      try {
        return require.resolve(path);
      } catch {
        console.warn(`Template "${path}" is not exist`);
      }
    }
    return null;
  };

  console.log('=====createPages=====');
  const result = await wrapper(
    graphql(`
      {
        pages: allMdPage(limit: 100, filter: { type: { eq: "page" } }) {
          edges {
            node {
              id
              template
              slug
              locale
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

  const pages = result.data.pages.edges
    .filter(({ node: { slug } }) => !excludedSlugs.some((s) => slug.includes(s)))
    .sort((a, b) => a.node.slug - b.node.slug);

  if (pages.length === 0) {
    console.warn('\nNo pages');
  } else {
    console.log(`\nMd pages: ${pages.length}`);
    console.log('---------------');
    pages.forEach(({ node: { id, template, slug, locale } }) => {
      console.log('pagepath=', slug);
      createPage({
        path: slug,
        component: getTemplate(template || slug2template(slug)) || pageDefaultTemplate,
        context: {
          id,
          locale,
        },
      });
    });
  }
};
