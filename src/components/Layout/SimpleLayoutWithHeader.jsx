import React from 'react';

import Layout from './SimpleLayout';
import PageHeader from '../DefaultHeader';

const SimpleLayoutWithHeader = ({ title, subtitle, context, children }) => {
  return (
    <Layout context={context}>
      <PageHeader title={title} subtitle={subtitle} />
      {children}
    </Layout>
  );
};

export default SimpleLayoutWithHeader;
