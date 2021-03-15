import React from 'react';

import ContainerLayout from './ContainerLayout';
import PageHeader from '../DefaultHeader';

const Layout = ({ title, subtitle, context, children }) => (
  <ContainerLayout context={context}>
    <PageHeader title={title} subtitle={subtitle} />
    {children}
  </ContainerLayout>
);

export default Layout;
