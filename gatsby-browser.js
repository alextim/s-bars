import React from 'react';

import I18nProvider from './src/i18n/i18n-context';

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({
  element,
  props: {
    pageContext: { locale },
  },
  // eslint-disable-next-line react/jsx-filename-extension
}) => <I18nProvider locale={locale}>{element}</I18nProvider>;
