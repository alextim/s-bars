import React from 'react';

import ContainerLayout from './ContainerLayout';
import PageHeader from '../DefaultHeader';

const Layout = ({ title, headline, context, children }) => (
  <ContainerLayout context={context}>
    <PageHeader title={title} headline={headline} />
    {children}
  </ContainerLayout>
);

export default Layout;
