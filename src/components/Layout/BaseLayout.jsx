/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';

import theme from '../../theme';

import AppContextProvider from '../../context';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header/Header';
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
  [t.mq.xl]: {
    marginTop: t.sizes.header.xxl,
    paddingBottom: t.sizes.header.xxl,
  },
});

const BaseLayout = ({ context, children }) => (
  <AppContextProvider value={context}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ContextReadyWrap>{children}</ContextReadyWrap>
    </ThemeProvider>
  </AppContextProvider>
);

const ContextReadyWrap = ({ children }) => {
  // const [InquiryForm, openInquiryForm] = useInquiryForm();
  // eslint-disable-next-line no-alert
  const openInquiryForm = () => alert('Sorry. In development');
  return (
    <div css={rootStyle}>
      {/* <InquiryForm /> */}
      <Header onCtaClick={openInquiryForm} />
      <main css={mainStyle}>{children}</main>
      <Footer onCtaClick={openInquiryForm} />
    </div>
  );
};

export default BaseLayout;
