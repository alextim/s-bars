import React from 'react';
import { Helmet } from 'react-helmet';

import getWebSiteSchema from './getWebSiteSchema';
import getPageSchema from './getPageSchema';
import getOrganizationSchema from './getOrganizationSchema';

const SeoBase = ({
  config,
  siteMeta,
  i18n,
  orgContacts,
  orgAddress,
  socialLinks,
  title,
  headline,
  description,
  locale,
  pathname,
  pageType,
  imgPath,
  datePublished,
  dateModified,
  canonical,
  noindex,
  metas,
  links,
}) => {
  const isRoot = pathname === '/';

  const URL = `${config.siteUrl}${pathname}`;
  const homeURL = i18n ? `${config.siteUrl}${i18n.localizePath('/', locale)}` : URL;

  let imgURL;
  if (imgPath) {
    imgURL = `${config.siteUrl}${imgPath}`;
  }

  const purePath = i18n ? i18n.purePath(pathname) : pathname;

  const ogImage = { ...config.ogImage, src: `${config.ogImage.src}${locale}.jpg` };
  const twitterImage = { ...config.twitterImage, src: `${config.twitterImage.src}${locale}.jpg` };

  const { htmlLang, ogLocale, siteTitle, siteDescription } = siteMeta;

  const isArticle = pageType === 'Article' || pageType === 'BlogPosting';

  const metaTitle = title || siteTitle;
  const metaDescription = description || siteDescription;
  return (
    <Helmet>
      <html lang={htmlLang} />
      <meta name="robots" content={`${noindex ? 'no' : ''}index, follow`} />
      <title>{metaTitle}</title>
      {i18n?.localeCodes.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={i18n.locales[code].htmlLang}
          href={`${config.siteUrl}${i18n.localizePath(purePath, code)}`}
        />
      ))}
      {i18n && <link rel="alternate" hrefLang="x-default" href={`${config.siteUrl}${purePath}`} />}
      {/** *
       * https://developer.mozilla.org/ru/docs/Web/HTTP/Headers/Content-Language
       *
       * Не  используйте этот мета элемент как здесь для констатирования языка документа:
       *
       * <meta httpEquiv="content-language" content={htmlLang} />
       *
       *  */}
      <meta name="description" content={metaDescription} />
      {canonical && <link rel="canonical" href={URL} />}
      {links && links.map(({ rel, href }) => <link key={href} rel={rel} href={href} />)}
      <meta name="theme-color" content={config.themeColor} />
      {metas &&
        Object.keys(metas).map((name) => <meta key={name} name={name} content={metas[name]} />)}
      {config.fbAppID && <meta property="fb:app_id" content={config.fbAppID} />}
      <meta property="og:locale" content={ogLocale} />
      {i18n?.localeCodes
        .filter((code) => code !== locale)
        .map((code) => (
          <meta key={code} property="og:locale:alternate" content={i18n.locales[code].ogLocale} />
        ))}
      <meta property="og:site_name" content={i18n.locales[locale].siteShortName} />
      {socialLinks && socialLinks.facebook && (
        <meta property="article:publisher" content={socialLinks.facebook.to} />
      )}
      <meta property="og:url" content={URL} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage.src} />
      <meta property="og:image:alt" content={metaDescription} />
      <meta property="og:image:width" content={ogImage.width} />
      <meta property="og:image:height" content={ogImage.height} />
      {socialLinks &&
        Object.keys(socialLinks).map((key) => (
          <meta key={key} property="og:see_also" content={socialLinks[key].to} />
        ))}
      <meta name="twitter:card" content="summary_large_image" />
      {(config.twitterCreator || config.twitterSite) && (
        <>
          <meta name="twitter:site" content={config.twitterSite || config.twitterCreator} />
          <meta name="twitter:creator" content={config.twitterCreator || config.twitterSite} />
        </>
      )}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={twitterImage.src} />
      <meta name="twitter:image:alt" content={metaDescription} />
      <meta name="twitter:image:width" content={twitterImage.width} />
      <meta name="twitter:image:height" content={twitterImage.height} />
      <link type="text/plain" href={`${config.siteUrl}/humans.txt`} rel="author" />
      <script type="application/ld+json">
        {JSON.stringify(
          getWebSiteSchema({
            siteUrl: config.siteUrl,
            siteTitle,
            siteDescription,
            htmlLang,
          }),
        )}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(
          getPageSchema({
            organizationName: orgAddress.name,
            siteUrl: config.siteUrl,
            siteLogo: config.siteLogo,
            URL,
            headline: headline || metaDescription,
            metaTitle,
            metaDescription,
            htmlLang,
            imgURL,
            datePublished,
            dateModified,
            pageType,
          }),
        )}
      </script>
      {isRoot && (
        <script type="application/ld+json">
          {JSON.stringify(
            getOrganizationSchema({
              orgContacts,
              orgAddress,
              config,
              homeURL,
              socialLinks,
            }),
          )}
        </script>
      )}
    </Helmet>
  );
};

export default SeoBase;
