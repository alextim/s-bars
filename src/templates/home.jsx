import React from 'react';
import { graphql } from 'gatsby';

import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Layout from '@/components/Layout/BaseLayout';
import Section from '@/components/Section';

import mq from '@/theme/media-queries';
import { space } from '@/theme/space';

import { Slider, ObjectTypes, Triptych, WorkTypes, Carousel, Credo } from './home.components';

const styleTitle = {
  marginTop: space[2],
};

const styleHeadline = {
  margin: `${space[4]} auto ${space[10]}`,
  textAlign: 'center',

  [mq.md]: {
    padding: `0 ${space[12]}`,
  },

  [mq.lg]: {
    padding: '0 10rem',
  },
};

const HomeTemplate = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, headline, metaTitle, metaDescription, noindex, sections, html },
  } = data;
  const objectTypes = mainNav.edges[1].node.submenu;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO locale={locale} title={metaTitle} description={metaDescription} pathname={pathname} noindex={noindex} />

      <Container>
        {sections && (
          <React.Fragment>
            <Slider items={sections[0].items} />

            <h1 css={styleTitle}>{title}</h1>
            <div css={styleHeadline}>{headline}</div>

            <ObjectTypes title={sections[1].title} subtitle={sections[1].subtitle} text={sections[1].text} items={objectTypes} />
            <Triptych
              title={sections[2].title}
              subtitle={sections[2].subtitle}
              text={sections[2].text}
              items={sections[2].items}
              breakWords
            />
            <WorkTypes title={sections[3].title} items={sections[3].items} />
            <Carousel title={sections[4].title} subtitle={sections[4].subtitle} text={sections[4].text} items={sections[4].items} />
            <Credo title={sections[5].title} subtitle={sections[5].subtitle} text={sections[5].text} items={sections[5].items} />
          </React.Fragment>
        )}
        {html && (
          <Section>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Section>
        )}
      </Container>
    </Layout>
  );
};

export default HomeTemplate;

export const pageQuery = graphql`
  query HomePageQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      title
      headline
      metaTitle
      metaDescription
      noindex
      sections {
        title
        subtitle
        text
        items {
          title
          to
          subtitle
          text
          icon
          image {
            alt
            title
            sm {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      html
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
