/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import Utils from 'at-utils';

import useOrgContacts from '../hooks/useOrgContacts';
import { useTranslation } from '../i18n';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Section from '../components/Section';

import styleItemsWrap from '../components/organization/styleItemsWrap';
import OrganizationOpeningHours from '../components/organization/OrganizationOpeningHours';

const styleContactItemWrap = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  [t.mq.lg]: {
    paddingRight: '1rem',
    ':last-of-type': {
      paddingRight: 0,
    },
  },
});
const styleContactItemTitle = {
  marginBottom: '0.5rem',
  fontWeight: 'bold',
};
const styleAddressWrap = {
  marginBottom: '0.5rem',
};
const styleItemSeparator = {
  marginBottom: '0.5rem',
};

const ContactItemHeading = ({ title }) => <div css={styleContactItemTitle}>{title}</div>;

const Address = ({ data }) => {
  const {
    legalName,
    postalAddress: { addressCountry, addressLocality, postalCode, streetAddress },
  } = data;
  return (
    <div css={styleItemSeparator}>
      <ContactItemHeading title={legalName} />
      <div css={styleAddressWrap}>
        <div>{streetAddress}</div>
        <div>
          {addressLocality} {postalCode}
        </div>
        <div>{addressCountry}</div>
      </div>
    </div>
  );
};

const OpeningHours = ({ data }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div css={styleContactItemTitle}>{t('contacts.opening_time')}</div>
      <OrganizationOpeningHours openingHours={data} />
    </React.Fragment>
  );
};

const EmailLink = ({ email }) => {
  const e = Utils.obfuscate(email);
  return <a href={`mailto:${e}`}>{e}</a>;
};

const ContactPoints = ({ items }) => {
  if (!items) {
    return null;
  }
  return items.map(({ description, name, contactType, email, telephone }) => (
    <div css={styleContactItemWrap} key={name}>
      <ContactItemHeading title={description} />
      <div>{name}</div>
      <div css={styleItemSeparator}>{contactType}</div>
      <div css={styleItemsWrap}>
        {telephone.map((tel) => (
          <a key={tel} href={Utils.phoneUrl(tel)}>
            {Utils.formatPhone(tel)}
          </a>
        ))}
        {email.map((em) => (
          <EmailLink key={em} email={em} />
        ))}
      </div>
    </div>
  ));
};

const styleWrap3 = (t) => ({
  display: 'grid',
  gridGap: t.space[8],
  [t.mq.lg]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const ContactsTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, metaTitle, description, metaDescription, noindex, locale, slug },
  } = data;
  const { openingHours, embedMap } = useOrgContacts();
  const { contactPoint } = address;

  return (
    <Layout
      title={title}
      subtitle={description}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
      />

      <Section>
        <div css={styleWrap3}>
          <div>
            <Address data={address} />
            <OpeningHours data={openingHours} />
          </div>
          <ContactPoints items={contactPoint} />
        </div>
      </Section>

      <Section>
        <iframe
          title="Google Maps"
          src={embedMap}
          width="100%"
          height="450"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          loading="lazy"
        />
      </Section>
    </Layout>
  );
};

export default ContactsTemplate;

export const contactsPageQuery = graphql`
  query ContactsPageQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      ...MdPageFragment
    }
    address: yaml(fields: { type: { eq: "address" }, locale: { eq: $locale } }) {
      ...AddressFragment
    }
    mainNav: allYaml(filter: { fields: { type: { eq: "main-nav" }, locale: { eq: $locale } } }) {
      edges {
        node {
          title
          fields {
            to
            submenu {
              title
              to
            }
          }
        }
      }
    }
    footerNav: allYaml(
      filter: { fields: { type: { eq: "footer-nav" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          title
          fields {
            to
          }
        }
      }
    }
    socialLinks: allYaml(
      filter: { fields: { type: { eq: "social-links" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allYaml(
      filter: { fields: { type: { eq: "translations" }, locale: { eq: $locale } } }
      limit: 1000
    ) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
