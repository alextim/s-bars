const writeSiteMap = require('./write-sitemap');

const getPureSlug = (slug, localeCodes) => {
  const a = slug.split('/');
  const locale = a[1];
  const isLocalized = localeCodes.some((el) => locale === el);
  if (!isLocalized) {
    return slug;
  }
  return `/${a.slice(2).join('/')}`;
};

module.exports = (allPages, reporter, options, siteUrl, allLocales) => {
  reporter.info(`Generating main sitemap for ${allPages.length} nodes...`);

  const localeCodes = allLocales.map(({ code }) => code);

  const locales = allLocales.reduce((acc, { code, htmlLang }) => {
    acc[code] = htmlLang;
    return acc;
  }, {});

  const urlData = allPages.map(({ node: { slug } }) => {
    const pureSlug = getPureSlug(slug, localeCodes);

    const links = allPages
      .filter(({ node: { slug: linkSlug } }) => getPureSlug(linkSlug, localeCodes) === pureSlug)
      .map(({ node: { slug: linkSlug, locale: linkLocale } }) => ({
        url: siteUrl + linkSlug,
        lang: locales[linkLocale],
      }));

    const result = {
      url: siteUrl + slug,
      changefreq: 'weekly',
      priority: 0.7,
    };

    if (links) {
      result.links = [...links];
    }

    return result;
  });
  if (!urlData.length) {
    reporter.info('No data for sitemap. Nothing generated.');
    return;
  }

  const generationOptions = {
    hostname: siteUrl,
    xmlns: {
      news: false,
      xhtml: true,
      image: false,
      video: false,
    },
  };

  reporter.info(`Creating sitemap for ${urlData.length} nodes.`);
  const filePath = `${options.buildDir}/${options.mainSitemapPath}`;
  writeSiteMap(urlData, generationOptions, filePath).then(() =>
    reporter.info(`Main sitemap successfully written to ${filePath}`),
  );
};
