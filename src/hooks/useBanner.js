const useBanner = (cover) => {
  if (!cover || !cover.sm) {
    return null;
  }

  let img;
  if (cover.xl) {
    img = [cover.sm.childImageSharp.fluid, cover.xl.childImageSharp.fluid];
    /*
    img = [
      {
        ...cover.mobile.childImageSharp.fluid,
        media: '(max-width: 1023px)',
      },
      {
        ...cover.default.childImageSharp.fluid,
        media: '(min-width: 1024px)',
      },
    ];
    */
  } else {
    img = cover.sm.childImageSharp.fluid;
  }
  return {
    img,
    alt: cover.alt,
    imgTitle: cover.alt,
  };
};

export default useBanner;
