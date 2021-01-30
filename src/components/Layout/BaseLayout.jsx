/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';

import theme from '../../theme';

import AppContextProvider from '../../context';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header/Header';
import Footer from '../Footer';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  // variant: 'layout.root',
};

const mainStyle = (t) => ({
  width: '100%',
  flex: '1 1 auto',
  marginTop: t.sizes.header.sm,
  paddingBottom: t.sizes.header.sm,
  [t.mq.xl]: {
    marginTop: t.sizes.header.xxl,
    paddingBottom: t.sizes.header.xxl,
  },
});

const BaseLayout = ({ context, children }) => (
  <AppContextProvider value={context}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div css={rootStyle}>
        <Header />
        <main css={mainStyle}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  </AppContextProvider>
);

export default BaseLayout;
