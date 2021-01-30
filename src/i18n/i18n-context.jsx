import React from 'react';

const LocaleContext = React.createContext();

export default function I18nProvider({ locale, children }) {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return React.useContext(LocaleContext);
}
