import React from 'react';
import { graphql } from 'gatsby';

import utils from '@alextim/utils';
import mq from '@/theme/media-queries';
import { space } from '@/theme/space';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import Section from '@/components/Section';

import styleItemsWrap from '@/components/organization/styleItemsWrap';
import OrganizationOpeningHours from '@/components/organization/OrganizationOpeningHours';
import useOrgContacts from '@/hooks/useOrgContacts';
import { useTranslation } from '@/i18n';

const styleContactItemWrap = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  [mq.lg]: {
    paddingRight: '1rem',
    ':last-of-type': {
      paddingRight: 0,
    },
  },
};

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
    postalAddress: { addressCountryName, addressLocality, postalCode, streetAddress },
  } = data;
  return (
    <div css={styleItemSeparator}>
      <ContactItemHeading title={legalName} />
      <div css={styleAddressWrap}>
        <div>{streetAddress}</div>
        <div>
          {addressLocality} {postalCode}
        </div>
        <div>{addressCountryName}</div>
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
  const e = utils.obfuscate(email);
  return <a href={`mailto:${e}`}>{e}</a>;
};

const ContactPoints = ({ items }) => {
  if (!items) {
    return null;
  }
  return items.map(({ description, name, contactTypeName, email, telephone }) => (
    <div css={styleContactItemWrap} key={name}>
      <ContactItemHeading title={description} />
      <div>{name}</div>
      <div css={styleItemSeparator}>{contactTypeName}</div>
      <div css={styleItemsWrap}>
        {telephone.map((tel) => (
          <a key={tel} href={utils.phoneUrl(tel)}>
            {utils.formatPhone(tel)}
          </a>
        ))}
        {email.map((em) => (
          <EmailLink key={em} email={em} />
        ))}
      </div>
    </div>
  ));
};

const styleWrap3 = {
  display: 'grid',
  gridGap: space[8],
  [mq.lg]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const ContactsTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, headline, breadcrumbs },
  } = data;
  const { openingHours, embedMap } = useOrgContacts();
  const { contactPoint } = address;

  return (
    <Layout
      title={title}
      headline={headline}
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
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

export const Head = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    page: { metaTitle, metaDescription, noindex, breadcrumbs },
    socialLinks,
    address,
  } = data;

  return (
    <SEO
      locale={locale}
      title={metaTitle}
      description={metaDescription}
      pathname={pathname}
      noindex={noindex}
      breadcrumbs={breadcrumbs}
      socialLinksData={socialLinks}
      orgAddress={address}
    />
  );
};

export const pageQuery = graphql`
  query ContactsPageQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      ...MdPageFragment
    }
    address: address(locale: { eq: $locale }) {
      ...AddressFragment
    }
    mainNav: allMainNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
          submenu {
            title
            to
          }
        }
      }
    }
    footerNav: allFooterNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
        }
      }
    }
    socialLinks: allSocialLink(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allTranslation(filter: { locale: { eq: $locale } }, limit: 1000) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
