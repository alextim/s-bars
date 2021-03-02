module.exports = {
  // pages to exclude.
  // Paths must start with "/"
  excludePaths: [],

  // generated image sitemap filename
  sitemapPath: 'image-sitemap.xml',

  // build dir to read the output files from
  // also to write the sitemap to
  buildDir: './public',

  // don't add images with missing alt tag to sitemap
  ignoreImagesWithoutAlt: true,

  // add image sitemap link to pages' head
  createLinkInHead: true,

  specialFolder: 'assets',
};
