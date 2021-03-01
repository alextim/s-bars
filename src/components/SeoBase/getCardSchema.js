/* eslint-disable react-hooks/rules-of-hooks */
import config from '../../../config/website';

import { locales } from '../../i18n/i18n';
import { useLocale } from '../../i18n/i18n-context';

import useOrganization from '../../hooks/useOrganization';

import getPageSchema from './getPageSchema';

const getCardSchema = ({ to, title, description, cover, datePublished, pageType = 'Article' }) => {
  const { locale } = useLocale();
  const { name: organizationName } = useOrganization();

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
    description,
    htmlLang,
    imgURL,
    datePublished,
    pageType,
  });
};

export default getCardSchema;
