import React from 'react';
import { Link } from 'gatsby';

import { useLocale } from '../../i18n/i18n-context';
import i18n from '../../i18n';

const LocalizedLink = ({ to, children, ...props }) => {
  const { locale } = useLocale();
  const path = i18n.localizePath(to, locale);

  return (
    <Link {...props} to={path}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
