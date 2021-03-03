module.exports = {
  // pages to exclude.
  // Paths must start with "/"
  excludePaths: ['/dev-404-page', '/404', '/404.html'],

  // generated sitemap filenames
  mainSitemapPath: 'sitemap.xml',
  imageSitemapPath: 'image-sitemap.xml',

  // build dir to read the output files from
  // also to write the sitemap to
  buildDir: './public',

  // don't add images with missing alt tag to sitemap
  ignoreImagesWithoutAlt: false,

  // add image sitemap link to pages' head
  createLinkInHead: true,

  specialFolder: 'assets',
};
