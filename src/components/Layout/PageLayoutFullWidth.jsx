import React from 'react';

import useBanner from '../../hooks/useBanner';
import Hero from '../Hero';
import BaseLayout from './BaseLayout';

const PageLayoutFullWidth = ({ title, subtitle, cover, context, children }) => {
  const coverImage = useBanner(cover);
  return (
    <BaseLayout context={context}>
      <Hero
        title={title}
        subtitle={subtitle}
        img={coverImage?.img}
        alt={coverImage?.alt}
        imgTitle={coverImage?.imgTitle}
      />
      {children}
    </BaseLayout>
  );
};

export default PageLayoutFullWidth;
