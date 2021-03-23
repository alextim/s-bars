import { useStaticQuery, graphql } from 'gatsby';

const useOrgContacts = () => {
  const data = useStaticQuery(graphql`
    query OrganizationQuery {
      contact {
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

  return data.contact;
};

export default useOrgContacts;
