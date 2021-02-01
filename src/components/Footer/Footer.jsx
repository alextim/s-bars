/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import merge from 'lodash/merge';

import Container from '../Container';
import FooterWidget from './FooterWidget';
import LegalInfo from './LegalInfo';
import FooterNavigation from './FooterNavigation';

import { useTranslation } from '../../i18n';
import { useAppContext } from '../../context';
import useOrganization from '../../hooks/useOrganization';
import useFooterNavItems from '../../hooks/useFooterNavItems';
import useSocialLinks from '../../hooks/useSocialLinks';

import SocialLinks from './SocialLinks';

import OrganizationPostalAddress from '../organization/OrganizationPostalAddress';
import OrganizationEmail from '../organization/OrganizationEmail';
// import OrganizationSite from '../organization/OrganizationSite';
import OrganizationPhones from '../organization/OrganizationPhones';
// import OrganizationCloudPhones from '../organization/OrganizationCloudPhones';

const Footer = () => {
  const theme = useTheme();
  const { mq, space, colors, fontSizes } = theme;
  const { t } = useTranslation();
  const { email, phone, foundingDate } = useOrganization();
  const { address } = useAppContext();
  const navItems = useFooterNavItems();
  const socialLinks = useSocialLinks();

  const WidgetWrapper = ({ extraStyle, children }) => (
    <div
      css={merge(extraStyle, {
        marginBottom: '1rem',
        lineHeight: 1.75,
        [mq.sm]: {
          marginBottom: '1.5rem',
        },
        [mq.md]: {
          marginBottom: '1rem',
        },
        [mq.lg]: {
          marginBottom: 0,
        },
      })}
    >
      {children}
    </div>
  );

  const styleWidgetArea = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    a: {
      ':hover': {
        color: colors.footer.highlight,
      },
    },
    paddingTop: space[4],
    paddingBottom: space[4],
    [mq.md]: {
      paddingTop: space[6],
      paddingBottom: space[6],
    },
  };

  const styleWidgetGreeting = {
    width: '100%',
    paddingRight: space[0],
    [mq.lg]: {
      width: '50%',
      paddingRight: space[6],
    },
  };

  const styleGreetingText = { textAlign: 'justify' };

  const styleWidgetAddr1 = {
    width: '100%',
    [mq.sm]: {
      width: 'auto',
    },
  };

  const styleWidgetAddr2 = {
    width: '100%',
    [mq.sm]: {
      width: 'auto',
    },
  };

  const styleColophonTop = {
    width: '100%',
    padding: '1.5rem 0',
    backgroundColor: colors.footer.colophon.top.bg,
  };

  const styleColophonBottom = {
    width: '100%',
    padding: '0.5rem 0',
    backgroundColor: colors.footer.colophon.bottom.bg,
    fontSize: fontSizes[0],
  };

  const footerStyle = {
    color: colors.footer.text,
    backgroundColor: colors.footer.bg,
    fontSize: fontSizes[1],
    width: '100%',
    a: {
      color: colors.footer.text,
      '&:active, &:focus, &:hover': {
        outline: 'none',
        textDecoration: 'none',
      },
    },
  };

  return (
    <footer css={footerStyle}>
      <Container css={styleWidgetArea}>
        <WidgetWrapper extraStyle={styleWidgetGreeting}>
          <h3>{t('footer.greeting.title')}</h3>
          <div css={styleGreetingText}>{t('footer.greeting.text')}</div>
        </WidgetWrapper>

        <WidgetWrapper extraStyle={styleWidgetAddr1}>
          <FooterWidget title={t('footer.our_address')}>
            <OrganizationPostalAddress />
          </FooterWidget>
        </WidgetWrapper>

        <WidgetWrapper extraStyle={styleWidgetAddr2}>
          <FooterWidget title={t('footer.call_us')}>
            <OrganizationPhones phones={phone} />
            <OrganizationEmail emails={email} />
            {/*
            <OrganizationSite />
            <OrganizationCloudPhones voice={voice} />
            */}
          </FooterWidget>
        </WidgetWrapper>
      </Container>

      <div css={styleColophonTop}>
        <Container>
          {socialLinks && <SocialLinks items={socialLinks} />}
          <FooterNavigation items={navItems} />
        </Container>
      </div>
      <div css={styleColophonBottom}>
        <Container>
          <LegalInfo foundingDate={foundingDate} legalName={address ? address.legalName : null} />
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
