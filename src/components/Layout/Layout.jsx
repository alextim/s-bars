import React from 'react';

import ContainerLayout from './ContainerLayout';
import PageHeader from '../DefaultHeader';
import Breadcrumbs from '../Breadcrumbs';

const Layout = ({ title, headline, breadcrumbs, context, children }) => (
  <ContainerLayout context={context}>
    <Breadcrumbs items={breadcrumbs} />
    <PageHeader title={title} headline={headline} />
    {children}
  </ContainerLayout>
);

export default Layout;
