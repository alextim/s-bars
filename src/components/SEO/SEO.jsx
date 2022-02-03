import React from 'react';
import { Helmet } from 'react-helmet';

import { getSeoData } from '@alextim/at-seo';

import i18n from '@/i18n';
import useSocialLinks from '@/hooks/useSocialLinks';
import useOrgContacts from '@/hooks/useOrgContacts';
import useOrgAddress from '@/hooks/useOrgAddress';

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
}) => {
  const socialLinks = useSocialLinks();
  const orgAddress = useOrgAddress();
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

  return <Helmet htmlAttributes={data.htmlAttributes} title={data.title} meta={data.meta} link={data.link} script={data.script} />;
};

export default SEO;
