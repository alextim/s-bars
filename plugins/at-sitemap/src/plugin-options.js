module.exports = (pluginOptions) => ({
  // pages to exclude.
  // Paths must start with "/"
  excludePaths: pluginOptions.excludePaths || ['/dev-404-page', '/404', '/404.html'],

  // generated sitemap filenames
  mainSitemap: pluginOptions.mainSitemap || 'sitemap.xml',
  imageSitemap: pluginOptions.imageSitemap || 'image-sitemap.xml',

  // build dir to read the output files from
  // also to write the sitemap to
  buildDir: pluginOptions.buildDir || './public',

  // don't add images with missing alt tag to sitemap
  ignoreImagesWithoutAlt: pluginOptions.ignoreImagesWithoutAlt ?? false,

  // add image sitemap link to pages' head
  createLinkInHead: pluginOptions.createLinkInHead ?? true,

  specialFolder: pluginOptions.specialFolder || 'assets',
});
