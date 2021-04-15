import { useStaticQuery, graphql } from 'gatsby';

const useAllSitePath = () => {
  const data = useStaticQuery(graphql`
    query AllSitePathQuery {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `);

  return data.allSitePage.edges;
};

export default useAllSitePath;
