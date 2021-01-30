import React from 'react';

import ContentContainer from './ContentContainer';
import PageLayoutFullWidth from './PageLayoutFullWidth';

const PageLayout = ({ title, subtitle, cover, context, children }) => {
  return (
    <PageLayoutFullWidth title={title} subtitle={subtitle} cover={cover} context={context}>
      <ContentContainer>{children}</ContentContainer>
    </PageLayoutFullWidth>
  );
};

export default PageLayout;
