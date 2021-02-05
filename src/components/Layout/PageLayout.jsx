import React from 'react';

import Container from '../Container';
import PageLayoutFullWidth from './PageLayoutFullWidth';

const PageLayout = ({ title, subtitle, cover, context, children }) => {
  return (
    <PageLayoutFullWidth title={title} subtitle={subtitle} cover={cover} context={context}>
      <Container>{children}</Container>
    </PageLayoutFullWidth>
  );
};

export default PageLayout;
