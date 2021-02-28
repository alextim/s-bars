import getOrganizationSchemaDetails from './getOrganizationSchemaDetails';

const getSchema = ({
  URL,
  homeURL,
  organization,
  address,
  siteMeta,
  config,
  socialLinks,
  siteTitle,
  siteDescription,
  htmlLang,
  metaTitle,
  metaDescription,
  imgURL,
  datePublished,
  pageType,
}) => {
  const webSiteId = `${homeURL}/#website`;
  const organizationId = `${homeURL}/#organization`;
  const webPageId = `${URL}/#webpage`;
  let primaryImageId;
  const a = [
    {
      '@type': organization.organizationType,
      '@id': organizationId,
      ...getOrganizationSchemaDetails({
        organization,
        address,
        siteMeta,
        config,
        homeURL,
        socialLinks,
      }),
    },

    {
      '@type': 'WebSite',
      '@id': webSiteId,
      url: homeURL,
      name: siteTitle,
      description: siteDescription,
      publisher: {
        '@id': organizationId,
      },
      inLanguage: htmlLang,
    },
  ];

  const webPage = {
    '@type': 'WebPage',
    '@id': webPageId,
    inLanguage: htmlLang,
    url: URL,
    name: metaTitle,
    description: metaDescription,
    isPartOf: {
      '@id': webSiteId,
    },
  };
  if (datePublished) {
    webPage.datePublished = datePublished;
  }

  if (imgURL) {
    primaryImageId = `${URL}/#primaryimage`;

    a.push({
      '@type': 'ImageObject',
      '@id': primaryImageId,
      inLanguage: htmlLang,
      url: imgURL,
      // width:	1304,
      // height: 674,
    });

    webPage.primaryImageOfPage = {
      '@id': primaryImageId,
    };
  }

  a.push(webPage);

  const common = {
    inLanguage: htmlLang,
    url: URL,
    name: metaTitle,
    description: metaDescription,
    isPartOf: {
      '@id': webPageId,
    },
    publisher: {
      '@id': organizationId,
    },
    mainEntityOfPage: {
      '@id': webPageId,
    },
  };
  if (imgURL) {
    common.image = {
      '@id': primaryImageId,
    };
  }

  if (pageType === 'Article') {
    const article = {
      '@type': pageType,
      '@id': `${URL}/#article`,
      ...common,
    };
    if (datePublished) {
      article.datePublished = datePublished;
    }
    a.push(article);
  } else if (pageType === 'BlogPosting') {
    const blogPosting = {
      '@type': pageType,
      '@id': `${URL}/#blogposting`,
      ...common,
    };
    if (datePublished) {
      blogPosting.datePublished = datePublished;
    }
    a.push(blogPosting);
  } else if (pageType === 'Blog') {
    const blog = {
      '@type': pageType,
      '@id': `${URL}/#blog`,
      ...common,
    };
    a.push(blog);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': a,
  };
};

export default getSchema;
