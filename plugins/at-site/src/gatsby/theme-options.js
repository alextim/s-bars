module.exports = (themeOptions) => ({
  pagePathes: themeOptions.pagePathes || { page: 'pages' },
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
