module.exports = (pluginOptions) => ({
  pageDirs: pluginOptions.pageDirs || { page: 'pages' },
  excludedSlugs: pluginOptions.excludedSlugs || [],
});
