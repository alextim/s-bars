import { ThemeProvider } from '@emotion/react';

import mq from '@/theme/media-queries';
import sizes from '@/theme/sizes';
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
};

const mainStyle = {
  width: '100%',
  flex: '1 1 auto',
  marginTop: sizes.header.sm,
  paddingBottom: sizes.header.sm,
  [mq.lg]: {
    marginTop: sizes.header.lg,
    paddingBottom: sizes.header.lg,
  },
};

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
