const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');

const defaultOptions = require('./default-options');

const wrapper = require('../../src/gatsby/promise-wrapper');

module.exports = async ({ graphql, reporter }, pluginOptions) => {
  reporter.info('custom onPostBuild');

  const options = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const imagesFromAst = (htmlAst) => {
    const a = [];

    const findImageTags = (node) => {
      if (node.tagName === 'img') {
        const {
          properties: { src, alt },
        } = node;
        if (src.startsWith('/')) {
          a.push({ src, alt });
        } else if (src.startsWith(options.specialFolder)) {
          a.push({ src: `/${src}`, alt });
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

  options.excludePaths.push('/dev-404-page/');

  const result = await wrapper(
    graphql(`
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                cover {
                  alt
                  xl {
                    publicURL
                  }
                  sm {
                    publicURL
                  }
                }
                sections {
                  image {
                    alt
                    xl {
                      publicURL
                    }
                    sm {
                      publicURL
                    }
                  }
                  items {
                    image {
                      alt
                      sm {
                        publicURL
                      }
                      xl {
                        publicURL
                      }
                    }
                  }
                }
              }
              htmlAst
            }
          }
        }
      }
    `),
  );
  if (result.errors) {
    reporter.panic(result.errors);
    return;
  }
  const { siteUrl } = result.data.site.siteMetadata;
  const allPages = result.data.allMarkdownRemark.edges;

  reporter.info(`Generating image sitemap for ${allPages.length} pages...`);

  let imagesCount = 0;
  const urlData = [];

  allPages.forEach(
    ({
      node: {
        fields: { slug },
        htmlAst,
        frontmatter: { cover, sections },
      },
    }) => {
      const pageImages = {};

      const addImage = (image) => {
        if (!image || (options.ignoreImagesWithoutAlt && !image.alt)) {
          return;
        }
        const img = image.xl || image.sm;
        if (!img || !img.publicURL) {
          return;
        }
        pageImages[img.publicURL] = image.alt;
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
      astImages.forEach(({ src, alt }) => {
        if (!options.ignoreImagesWithoutAlt || alt) {
          pageImages[src] = alt;
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
          title: pageImages[image],
        })),
      });
    },
  );
  if (!imagesCount) {
    reporter.info('No images for sitemap. Nothing generated.');
    return;
  }
  reporter.info(`Creating sitemap for ${imagesCount} images.`);

  const stream = new SitemapStream({ hostname: siteUrl });

  // Return a promise that resolves with your XML string
  streamToPromise(Readable.from(urlData).pipe(stream)).then((data) => {
    fs.writeFileSync(`${options.buildDir}/${options.sitemapPath}`, data.toString());
    reporter.info(
      `Image sitemap successfully written to ${options.buildDir}/${options.sitemapPath}`,
    );
  });
};
