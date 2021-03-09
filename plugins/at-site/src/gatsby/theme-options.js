module.exports = (themeOptions) => ({
  pagesPath: themeOptions.pagesPath || 'pages',
  excludedSlugs: themeOptions.excludedSlugs || [
    'blog',
    'category',
    'category-list',
    'tags',
    'tag-list',
    'years',
    'year-list',
  ],
});
