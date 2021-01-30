import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return siteMetadata;
};

export default useSiteMetadata;
