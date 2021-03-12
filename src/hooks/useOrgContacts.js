import { useStaticQuery, graphql } from 'gatsby';

const useOrgContacts = () => {
  const data = useStaticQuery(graphql`
    query OrganizationQuery {
      yaml(fields: { type: { eq: "contacts" } }) {
        organizationType
        email
        geo {
          latitude
          longitude
        }
        phone
        fax
        voice {
          skype
          telegram
          viber
          whatsapp
        }
        openingHours
        foundingDate
        hasMap
        embedMap
        priceRange
        currenciesAccepted
        paymentAccepted
      }
    }
  `);

  return data.yaml;
};

export default useOrgContacts;
