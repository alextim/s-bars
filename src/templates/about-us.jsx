/* eslint-disable react/no-danger */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import useOrganization from '../hooks/useOrganization';
import Icon from '../components/Icon';
import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';

const aboutStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const photoStyle = (t) => ({
  width: '100%',
  marginBottom: t.space[7],
  [t.mq.md]: {
    width: '30%',
  },
});
const textStyle = (t) => ({
  width: '100%',
  [t.mq.md]: {
    width: '70%',
    paddingLeft: t.space[7],
  },
});

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

const AboutTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, cover, noindex },
    html,
  } = data.page;
  const { email, phone } = useOrganization();

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      <div css={aboutStyle}>
        <div css={photoStyle}>
          {cover && cover.sm && <Img fluid={cover.sm.childImageSharp.fluid} alr={cover.alt} />}
        </div>
        <div css={textStyle}>{html && <div dangerouslySetInnerHTML={{ __html: html }} />}</div>
      </div>
      <div css={contactsStyle}>
        <div css={contactItemStyle}>
          <Icon name="phone" />
          <a href={`tel:${phone}`}>{`+${phone}`}</a>
        </div>
        <div css={contactItemStyle}>
          <Icon name="envelope" />
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </Layout>
  );
};

export default AboutTemplate;

export const aboutPageQuery = graphql`
  query AboutPageQuery($id: String!, $locale: String!) {
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
