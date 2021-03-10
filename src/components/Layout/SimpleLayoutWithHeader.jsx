import React from 'react';

import Layout from './SimpleLayout';
import PageHeader from '../DefaultHeader';

const SimpleLayoutWithHeader = ({ title, subtitle, context, children }) => (
  <Layout context={context}>
    <PageHeader title={title} subtitle={subtitle} />
    {children}
  </Layout>
);

export default SimpleLayoutWithHeader;
