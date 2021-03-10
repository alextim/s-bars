/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';

import theme from '../../theme';

import AppContextProvider from '../../context';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Footer from '../Footer';
// import useInquiryForm from '../useInquiryForm';

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
  [t.mq.lg]: {
    marginTop: t.sizes.header.xl,
    paddingBottom: t.sizes.header.xl,
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
