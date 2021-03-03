const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');

module.exports = (urlData, generationOptions, filePath) => {
  const stream = new SitemapStream(generationOptions);

  return streamToPromise(Readable.from(urlData).pipe(stream)).then((data) => {
    fs.writeFileSync(filePath, data.toString());
  });
};
