import React from 'react';

const AppContext = React.createContext();

export default function AppContextProvider({ value, children }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return React.useContext(AppContext);
}
