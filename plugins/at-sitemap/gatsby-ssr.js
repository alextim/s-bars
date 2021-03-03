const React = require('react');
const { withPrefix } = require('gatsby');
const defaultOptions = require('./src/default-options');

exports.onRenderBody = async ({ setHeadComponents }, pluginOptions) => {
  const { mainSitemapPath, imageSitemapPath, createLinkInHead } = {
    ...defaultOptions,
    ...pluginOptions,
  };

  if (!createLinkInHead) {
    return;
  }

  setHeadComponents([
    React.createElement('link', {
      key: 'at-sitemap',
      rel: 'sitemap',
      type: 'application/xml',
      href: withPrefix(mainSitemapPath),
    }),
    React.createElement('link', {
      key: 'at-sitemap',
      rel: 'sitemap',
      type: 'application/xml',
      href: withPrefix(imageSitemapPath),
    }),
  ]);
};
