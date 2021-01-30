import { useStaticQuery, graphql } from 'gatsby';

const useOrganization = () => {
  const data = useStaticQuery(graphql`
    query OrganizationQuery {
      organization: yaml(fields: { type: { eq: "contacts" } }) {
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

  return data.organization;
};

export default useOrganization;
