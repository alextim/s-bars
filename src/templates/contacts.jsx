/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-danger */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import { Row, Col } from '../components/flex-grid';
import ContactForm from '../components/ContactForm';
import useOrganization from '../hooks/useOrganization';
import Icon from '../components/Icon';
import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';
import OrganizationOpeningHours from '../components/organization/OrganizationOpeningHours';
import Utils from '../lib/utils';
import { useTranslation } from '../i18n';

const contactsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};
const contactItemStyle = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginBottom: t.space[7],
  [t.mq.md]: {
    width: '50%',
  },
});

const SimpleContactData = () => {
  const { email, phone } = useOrganization();
  return (
    <React.Fragment>
      <div css={contactsStyle}>
        <div css={contactItemStyle}>
          <Icon name="phone" />
          {phone.map((tel) => (
            <a key={tel} href={Utils.phoneUrl(tel)}>
              {Utils.formatPhone(tel)}
            </a>
          ))}
        </div>
        <div css={contactItemStyle}>
          <Icon name="envelope" />
          {email.map((em) => (
            <a key={em} href={`mailto:${em}`}>
              {em}
            </a>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const contactItemrapStyle = (t) => ({
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
const contactItemTitleStyle = {
  marginBottom: '0.5rem',
};
const addressWrapStyle = {
  marginBottom: '0.5rem',
};
const itemSepStyle = {
  marginBottom: '0.5rem',
};
const contactFormWrapStyle = (t) => ({
  marginTop: '3rem',
  [t.mq.lg]: {
    margin: '2rem',
  },
});
const ContactItemHeading = ({ title }) => <h2 css={contactItemTitleStyle}>{title}</h2>;

const Address = ({ data }) => {
  const {
    legalName,
    postalAddress: { addressCountry, addressLocality, postalCode, streetAddress },
  } = data;
  return (
    <div css={itemSepStyle}>
      <ContactItemHeading title={legalName} />
      <div css={addressWrapStyle}>
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
    <>
      <h3 css={contactItemTitleStyle}>{t('contacts.opening_time')}</h3>
      <OrganizationOpeningHours openingHours={data} />
    </>
  );
};

const ContactPoints = ({ items }) =>
  items.map(({ description, name, contactType, email, telephone }) => (
    <Col css={contactItemrapStyle} key={name}>
      <ContactItemHeading title={description} />
      <div>{name}</div>
      <div>{contactType}</div>
      {telephone.map((tel) => (
        <a key={tel} href={Utils.phoneUrl(tel)}>
          {Utils.formatPhone(tel)}
        </a>
      ))}
      {email.map((em) => (
        <a key={em} href={`mailto:${em}`}>
          {em}
        </a>
      ))}
    </Col>
  ));

const ContactsTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = data.page;
  const { openingHours, embedMap } = useOrganization();
  const { contactPoint } = address;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      <Row>
        <Col css={contactItemrapStyle}>
          <Address data={address} />
          <OpeningHours data={openingHours} />
        </Col>
        {contactPoint ? <ContactPoints items={contactPoint} /> : <SimpleContactData />}
      </Row>
      <Row>
        <Col>
          <iframe
            src={embedMap}
            width="100%"
            height="450"
            frameBorder="0"
            css={(t) => ({ border: 0, marginTop: '3rem', [t.mq.lg]: { marginTop: 0 } })}
            allowFullScreen=""
            aria-hidden="false"
          />
        </Col>
        <Col css={contactFormWrapStyle}>
          <ContactForm />
        </Col>
      </Row>
    </Layout>
  );
};

export default ContactsTemplate;

export const contactsPageQuery = graphql`
  query ContactsPageQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...PageFragment
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
