/* eslint-disable react-hooks/rules-of-hooks */
import config from '../../../config/website';

import { locales } from '../../i18n/i18n';
import { useLocale } from '../../i18n/i18n-context';

import useOrgAddress from '../../hooks/useOrgAddress';

import getPageSchema from './getPageSchema';

const getCardSchema = ({
  to,
  title,
  headline,
  cover,
  datePublished,
  dateModified,
  pageType = 'Article',
}) => {
  const { locale } = useLocale();
  const { name: organizationName } = useOrgAddress();

  const { htmlLang } = locales[locale];
  const { siteUrl, siteLogo } = config;

  if (pageType !== 'Article' && pageType !== 'BlogPosting') {
    throw new Error(`getCardSchema: Unsupported pageType ${pageType}!`);
  }

  const URL = `${siteUrl}${to}`;

  let imgURL;
  if (cover && cover.sm && cover.sm.publicURL) {
    imgURL = `${siteUrl}${cover.sm.publicURL}`;
  }

  return getPageSchema({
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
  });
};

export default getCardSchema;
