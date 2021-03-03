const useBanner = (cover) => {
  if (!cover || !cover.sm) {
    return null;
  }

  let img;
  if (cover.xl) {
    img = [cover.sm.childImageSharp.gatsbyImageData, cover.xl.childImageSharp.gatsbyImageData];
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
    img = cover.sm.childImageSharp.gatsbyImageData;
  }
  return {
    img,
    alt: cover.alt,
    imgTitle: cover.alt,
  };
};

export default useBanner;
