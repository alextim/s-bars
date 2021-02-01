// https://github.com/teimurjan/issue-gatsby-layout-context/blob/master/src/layouts/layout-context.js
// https://stackoverflow.com/questions/61433742/using-wraprootelement-to-provide-context-in-gatsbyjs
// https://github.com/gatsbyjs/gatsby/issues/22833

//
// https://markoskon.com/wrap-root-element-vs-wrap-page-element/
import React from 'react';

import I18nProvider from './src/i18n/i18n-context';

export const wrapPageElement = ({
  element,
  props: {
    pageContext: { locale },
  },
}) => <I18nProvider locale={locale}>{element}</I18nProvider>;
