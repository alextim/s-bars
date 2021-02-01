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
        img={coverImage ? coverImage.img : null}
        alt={coverImage ? coverImage.alt : null}
        imgTitle={coverImage ? coverImage.imgTitle : null}
      />
      {children}
    </BaseLayout>
  );
};

export default PageLayoutFullWidth;
