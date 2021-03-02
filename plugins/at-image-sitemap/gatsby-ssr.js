const React = require('react');
const { withPrefix } = require('gatsby');
const defaultOptions = require('./default-options');

exports.onRenderBody = async ({ setHeadComponents }, pluginOptions) => {
  const { sitemapPath, createLinkInHead } = { ...defaultOptions, ...pluginOptions };

  if (!createLinkInHead) {
    return;
  }

  setHeadComponents([
    React.createElement('link', {
      key: 'at-image-sitemap',
      rel: 'sitemap',
      type: 'application/xml',
      href: withPrefix(sitemapPath),
    }),
  ]);
};
