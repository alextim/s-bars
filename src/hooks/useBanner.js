import { getImage } from 'gatsby-plugin-image';

const useBanner = (cover) => {
  if (!cover || !cover.sm) {
    return null;
  }

  let img;
  if (cover.xl) {
    img = [getImage(cover.sm), getImage(cover.xl)];
    /*
    img = [
      {
        ...cover.mobile.childImageSharp.gatsbyImageData,
        media: '(max-width: 1023px)',
      },
      {
        ...cover.default.childImageSharp.gatsbyImageData,
        media: '(min-width: 1024px)',
      },
    ];
    */
  } else {
    img = getImage(cover.sm);
  }
  return {
    img,
    alt: cover.alt,
    imgTitle: cover.alt,
  };
};

export default useBanner;
