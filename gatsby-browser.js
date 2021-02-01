import React from 'react';

import I18nProvider from './src/i18n/i18n-context';

export const wrapPageElement = ({
  element,
  props: {
    pageContext: { locale },
  },
}) => <I18nProvider locale={locale}>{element}</I18nProvider>;
