const writeSiteMap = require('./write-sitemap');

const imagesFromAst = (htmlAst, specialFolder) => {
  const a = [];

  const findImageTags = (node) => {
    if (node.tagName === 'img') {
      const {
        properties: { src, alt, title },
      } = node;
      if (src.startsWith('/')) {
        a.push({ src, alt, title });
      } else if (src.startsWith(specialFolder)) {
        a.push({ src: `/${src}`, alt, title });
      }
    }
    if (node.children) {
      node.children.forEach((childNode) => {
        findImageTags(childNode);
      });
    }
  };

  findImageTags(htmlAst);

  return a;
};

module.exports = (allPages, reporter, options, siteUrl) => {
  reporter.info(`Generating images sitemap for ${allPages.length} nodes...`);

  let imagesCount = 0;
  const urlData = [];

  allPages.forEach(({ node: { slug, htmlAst, cover, sections } }) => {
    const pageImages = {};

    const addImage = (image) => {
      if (!image || (options.ignoreImagesWithoutAlt && !image.alt)) {
        return;
      }
      const img = image.xl || image.sm;
      if (!img || !img.publicURL) {
        return;
      }
      pageImages[img.publicURL] = { alt: image.alt, title: image.title };
    };

    addImage(cover);

    if (sections) {
      sections.forEach(({ image: sectionImage, items }) => {
        addImage(sectionImage);
        if (items) {
          items.forEach(({ image: itemImage }) => addImage(itemImage));
        }
      });
    }

    const astImages = imagesFromAst(htmlAst);
    astImages.forEach(({ src, alt, title }) => {
      if (!options.ignoreImagesWithoutAlt || alt) {
        pageImages[src] = { alt, title };
      }
    });

    const pageImagesKeys = Object.keys(pageImages);
    if (pageImagesKeys.length === 0) {
      return;
    }

    imagesCount += pageImagesKeys.length;

    urlData.push({
      url: siteUrl + slug,
      img: pageImagesKeys.map((image) => ({
        url: siteUrl + image,
        title: pageImages[image].alt,
        caption: pageImages[image].title,
      })),
    });
  });

  if (!imagesCount) {
    reporter.info('No images for sitemap. Nothing generated.');
    return;
  }

  const generationOptions = {
    hostname: siteUrl,
    xmlns: {
      news: false,
      xhtml: false,
      image: true,
      video: false,
    },
  };

  const filePath = `${options.buildDir}/${options.imageSitemapPath}`;

  reporter.info(`Creating sitemap for ${imagesCount} images.`);
  writeSiteMap(urlData, generationOptions, filePath).then(() =>
    reporter.info(`Image sitemap successfully written to ${filePath}`),
  );
};
