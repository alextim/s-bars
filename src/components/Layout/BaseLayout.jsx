import { ThemeProvider } from '@emotion/react';

import mq from '@/theme/media-queries';
import sizes from '@/theme/sizes';
import theme from '../../theme';

import AppContextProvider from '../../context';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Footer from '../Footer';

const styleRoot = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const styleMain = {
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
      <div css={styleRoot}>
        <Header />
        <main css={styleMain}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  </AppContextProvider>
);

export default BaseLayout;
