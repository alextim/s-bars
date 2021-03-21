import React from 'react';
import SeoBase from '@alextim/at-seo';

import config from '../../../config/website';
import i18n from '../../i18n';

import useSocialLinks from '../../hooks/useSocialLinks';
import useOrgContacts from '../../hooks/useOrgContacts';
import useOrgAddress from '../../hooks/useOrgAddress';

const SEO = ({
  title,
  description,
  headline,
  locale,
  pathname,
  pageType,
  imgPath,
  datePublished,
  dateModified,
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
  return (
    <SeoBase
      config={config}
      siteMeta={siteMeta}
      i18n={i18n}
      orgContacts={orgContacts}
      orgAddress={orgAddress}
      socialLinks={socialLinks}
      title={title}
      description={description}
      headline={headline}
      locale={locale}
      pathname={pathname}
      pageType={pageType}
      imgPath={imgPath}
      datePublished={datePublished}
      dateModified={dateModified}
      canonical={canonical}
      noindex={noindex}
      metas={metas}
      links={links}
    />
  );
};

export default SEO;
