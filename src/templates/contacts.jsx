/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import Utils from '../lib/utils';
import useOrganization from '../hooks/useOrganization';
import { useTranslation } from '../i18n';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayoutWithHeader';
import Section from '../components/Section';

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
    <React.Fragment>
      <h3 css={styleContactItemTitle}>{t('contacts.opening_time')}</h3>
      <OrganizationOpeningHours openingHours={data} />
    </React.Fragment>
  );
};

const ContactPoints = ({ items }) => {
  if (!items) {
    return null;
  }
  return items.map(({ description, name, contactType, email, telephone }) => (
    <div css={styleContactItemWrap} key={name}>
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
    </div>
  ));
};

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ContactItemHeading title={t('contacts.write_us')} />
      <ContactForm />
    </div>
  );
};

const styleWrap3 = (t) => ({
  display: 'grid',
  gridGap: t.space[8],
  [t.mq.lg]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});
const styleWrap2 = (t) => ({
  display: 'grid',
  gridGap: t.space[8],
  [t.mq.lg]: {
    gridTemplateColumns: '1fr 1fr',
  },
});

const ContactsTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = data.page;
  const { openingHours, embedMap } = useOrganization();
  const { contactPoint } = address;

  return (
    <Layout
      title={title}
      subtitle={description}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
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
        <div css={styleWrap2}>
          <Contacts />
          <iframe
            title="Google Maps"
            src={embedMap}
            width="100%"
            height="450"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
          />
        </div>
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
