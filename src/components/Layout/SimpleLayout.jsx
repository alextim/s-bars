import React from 'react';

import ContentContainer from './ContentContainer';
import BaseLayout from './BaseLayout';

const SimpleLayout = ({ context, children }) => (
  <BaseLayout context={context}>
    <ContentContainer>{children}</ContentContainer>
  </BaseLayout>
);

export default SimpleLayout;
