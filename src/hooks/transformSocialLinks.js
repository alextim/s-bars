const transformSocialLinks = (socialLinks) => {
  if (!socialLinks.edges.length) {
    return undefined;
  }
  return socialLinks.edges.reduce((acc, { node: { code, to, title } }) => {
    acc[code] = { to, title };
    return acc;
  }, {});
};

export default transformSocialLinks;
