import React from 'react';

import { getSeoData } from '@alextim/at-seo';

import i18n from '@/i18n';
import transformSocialLinks from '@/hooks/transformSocialLinks';
import useOrgContacts from '@/hooks/useOrgContacts';

import config from '../../../s-bars.content/config/website';

const SEO = ({
  title,
  keywords,
  description,
  headline,
  locale,
  pathname,
  pageType,
  imgPath,
  datePublished,
  dateModified,
  author,
  breadcrumbs,
  tags,
  canonical = true,
  noindex = false,
  metas,
  links,
  socialLinksData,
  orgAddress,
}) => {
  const socialLinks = transformSocialLinks(socialLinksData);
  const orgContacts = useOrgContacts();
  const siteMeta = i18n.locales[locale];

  /*
  let dows;
  if (orgContacts.openingHours) {
    const KEY_START = 'dow.d2.';
    const keyLength = KEY_START.length;
    dows = translations.edges
      .filter(({ node }) => node.key.startsWith(KEY_START))
      .reduce((acc, { node }) => {
        const dow = node.key.substring(keyLength);
        acc[dow] = node.value;
        return acc;
      }, {});
  }
  */
  const data = getSeoData({
    config,
    siteMeta,
    i18n,
    orgContacts,
    orgAddress,
    socialLinks,
    title,
    keywords,
    headline,
    description,
    locale,
    pathname,
    pageType,
    imgPath,
    datePublished,
    dateModified,
    author,
    breadcrumbs,
    tags: tags?.map(({ title: tagTitle }) => tagTitle),
    canonical,
    noindex,
    metas,
    links,
  });

  return (
    <React.Fragment>
      <html lang={data.htmlAttributes.lang} />
      <title>{data.title}</title>
      {data.meta.map((item, i) => (
        <meta key={`meta-${i}`} {...item} />
      ))}
      {data.link.map((item, i) => (
        <link key={`link-${i}`} {...item} />
      ))}
      {data.script.map(({ type, innerHtml }, i) => (
        <script key={`script-${i}`} type={type}>
          {innerHtml}
        </script>
      ))}
    </React.Fragment>
  );
};

export default SEO;
