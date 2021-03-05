import React from 'react';
import SeoBase from '../SeoBase';

import config from '../../../config/website';
import i18n from '../../i18n';

import { useAppContext } from '../../context';
import useSocialLinks from '../../hooks/useSocialLinks';
import useOrganization from '../../hooks/useOrganization';

const SEO = ({
  title,
  description,
  locale,
  pathname,
  pageType,
  imgPath,
  datePublished,
  canonical = true,
  noindex = false,
  metas,
  links,
}) => {
  const socialLinks = useSocialLinks();
  const { address /* , translations */ } = useAppContext();
  const organization = useOrganization();
  const siteMeta = i18n.locales[locale];

  /*
  let dows;
  if (organization.openingHours) {
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
  return (
    <SeoBase
      config={config}
      siteMeta={siteMeta}
      i18n={i18n}
      organization={organization}
      address={address}
      socialLinks={socialLinks}
      title={title}
      description={description}
      locale={locale}
      pathname={pathname}
      pageType={pageType}
      imgPath={imgPath}
      datePublished={datePublished}
      canonical={canonical}
      noindex={noindex}
      metas={metas}
      links={links}
    />
  );
};

export default SEO;
