const getPageSchema = ({
  organizationName,
  siteUrl,
  siteLogo,
  URL,
  title,
  headline,
  htmlLang,
  imgURL,
  datePublished,
  dateModified,
  pageType,
  publisher,
  author,
}) => {
  const type =
    !pageType || !['Article', 'BlogPosting', 'Blog'].some((t) => pageType === t)
      ? 'WebPage'
      : pageType;
  const isArticle = pageType === 'Article' || pageType === 'BlogPosting';

  const o = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    inLanguage: htmlLang,
    publisher: publisher || {
      '@type': 'Organization',
      name: organizationName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: siteLogo,
      },
    },
  };

  if (isArticle) {
    o.author = author || o.publisher;
    o.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': URL,
    };
    o.headline = headline;
    if (datePublished) {
      o.datePublished = datePublished;
    }
    if (dateModified) {
      o.dateModified = dateModified;
    }
  } else {
    o.url = URL;
    o.description = headline;
  }

  if (imgURL) {
    o.image = imgURL;
  }

  return o;
};

export default getPageSchema;
