/* eslint-disable import/no-unresolved */
/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Gallery from '../Gallery';

const galleryStyle = (t) => ({
  marginBottom: t.space[6],
});

const LightboxGallery = ({ items }) => {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!openLightbox) {
    const images = items
      .filter(({ image }) => image && image.sm)
      .map(({ title, image }) => ({
        id: image.sm.id,
        ...image.sm.childImageSharp.fluid,
        caption: title,
        alt: image.alt,
      }));
    return (
      <div css={galleryStyle}>
        <Gallery
          images={images}
          itemsPerRow={[2, 2, 2, 3, 4]}
          onClick={(i) => {
            setPhotoIndex(i);
            setOpenLightbox(true);
          }}
        />
      </div>
    );
  }

  const lbImages = items.map(({ image }) => image.sm.childImageSharp.fluid.originalImg);

  return (
    <Lightbox
      mainSrc={lbImages[photoIndex]}
      nextSrc={lbImages[(photoIndex + 1) % lbImages.length]}
      prevSrc={lbImages[(photoIndex + lbImages.length - 1) % lbImages.length]}
      onCloseRequest={() => setOpenLightbox(false)}
      onMovePrevRequest={() => setPhotoIndex((photoIndex + lbImages.length - 1) % lbImages.length)}
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lbImages.length)}
    />
  );
};

export default LightboxGallery;
