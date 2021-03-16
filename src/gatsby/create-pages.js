/* eslint-disable no-console */
const config = require('../../config/website');

const templatesDir = `..${config.templatesDir}`;

const serviceDefaultTemplate = require.resolve(`${templatesDir}service.jsx`);
const objectTypeDefaultTemplate = require.resolve(`${templatesDir}object-type.jsx`);

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  console.log('===== createPages: Services & Object Types =====');
  const result = await graphql(`
    {
      objectTypes: allMdPage(limit: 100, filter: { type: { eq: "object" } }) {
        edges {
          node {
            id
            template
            slug
            locale
          }
        }
      }
      services: allMdPage(limit: 100, filter: { type: { eq: "service" } }) {
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
  `);

  if (result.errors) {
    reporter.panic(result.errors);
    return;
  }

  /**
   * Services
   */
  const services = result.data.services.edges;
  if (services.length === 0) {
    console.warn('\nNo services');
  } else {
    console.log(`\nMd services: ${services.length}`);
    console.log('---------------');
    services.forEach(({ node: { id, slug, locale } }) => {
      console.log('pagepath=', slug);
      createPage({
        path: slug,
        component: serviceDefaultTemplate,
        context: {
          id,
          locale,
        },
      });
    });
  }

  /**
   * Object Types
   */
  const objectTypes = result.data.objectTypes.edges;
  if (objectTypes.length === 0) {
    console.warn('\nNo object types');
  } else {
    console.log(`\nMd object types: ${objectTypes.length}`);
    console.log('---------------');
    objectTypes.forEach(({ node: { id, slug, locale } }) => {
      console.log('pagepath=', slug);
      createPage({
        path: slug,
        component: objectTypeDefaultTemplate,
        context: {
          id,
          locale,
        },
      });
    });
  }
};
