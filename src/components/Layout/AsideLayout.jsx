/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import sizes from '../../theme/sizes';

import { ContainerFullWidth as Container, Wrapper } from '../Container';

import Layout from './BaseLayout';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: sizes.header.sm,
  [mq.lg]: {
    flexDirection: 'row',
    marginTop: sizes.header.xl,
  },
};

const asideStyle = {
  flex: '0 0 auto',
  overflow: 'auto',
  background: '#E67E22',
  margin: '0 auto',
  padding: '0 1rem',
  [mq.sm]: {
    padding: '0 2rem',
  },
  [mq.lg]: {
    padding: '0 2rem 0 0',
  },
};
const AsideLayout = ({ title, subtitle, cover, hero, context, aside, children }) => (
  <Layout title={title} subtitle={subtitle} cover={cover} hero={hero} context={context}>
    <Container css={containerStyle}>
      <Wrapper>{children}</Wrapper>
      <aside css={asideStyle}>{aside}</aside>
    </Container>
  </Layout>
);

export default AsideLayout;
