import React from 'react';

import Container from '../Container';
import BaseLayout from './BaseLayout';

const ContainerLayout = ({ context, children }) => (
  <BaseLayout context={context}>
    <Container>{children}</Container>
  </BaseLayout>
);

export default ContainerLayout;
