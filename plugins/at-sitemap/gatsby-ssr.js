const React = require('react');
const { withPrefix } = require('gatsby');
const withOptions = require('./src/plugin-options');

exports.onRenderBody = async ({ setHeadComponents }, pluginOptions) => {
  const { mainSitemap, imageSitemap, createLinkInHead } = withOptions(pluginOptions);

  if (!createLinkInHead) {
    return;
  }

  setHeadComponents([
    React.createElement('link', {
      key: 'at-sitemap',
      rel: 'sitemap',
      type: 'application/xml',
      href: withPrefix(mainSitemap),
    }),
    React.createElement('link', {
      key: 'at-sitemap',
      rel: 'sitemap',
      type: 'application/xml',
      href: withPrefix(imageSitemap),
    }),
  ]);
};
