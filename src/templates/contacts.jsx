/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-danger */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import Utils from '../lib/utils';
import useOrganization from '../hooks/useOrganization';
import { useTranslation } from '../i18n';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';
import Section from '../components/Section';
import { Row, Col } from '../components/flex-grid';

import ContactForm from '../components/ContactForm';
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
};
const styleAddressWrap = {
  marginBottom: '0.5rem',
};
const styleItemSeparator = {
  marginBottom: '0.5rem',
};
const styleContactFormWrap = (t) => ({
  marginTop: '3rem',
  [t.mq.lg]: {
    margin: '2rem',
  },
});

const styleMap = (t) => ({
  border: 0,
  marginTop: '3rem',
  [t.mq.lg]: {
    marginTop: 0,
  },
});

const ContactItemHeading = ({ title }) => <h2 css={styleContactItemTitle}>{title}</h2>;

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
    <>
      <h3 css={styleContactItemTitle}>{t('contacts.opening_time')}</h3>
      <OrganizationOpeningHours openingHours={data} />
    </>
  );
};

const ContactPoints = ({ items }) => {
  if (!items) {
    return null;
  }
  return items.map(({ description, name, contactType, email, telephone }) => (
    <Col css={styleContactItemWrap} key={name}>
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
};

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

      <Section>
        <Row>
          <Col css={styleContactItemWrap}>
            <Address data={address} />
            <OpeningHours data={openingHours} />
          </Col>
          <ContactPoints items={contactPoint} />
        </Row>
      </Section>

      <Section>
        <Row>
          <Col>
            <iframe
              src={embedMap}
              width="100%"
              height="450"
              frameBorder="0"
              css={styleMap}
              allowFullScreen=""
              aria-hidden="false"
            />
          </Col>
          <Col css={styleContactFormWrap}>
            <ContactForm />
          </Col>
        </Row>
      </Section>
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
