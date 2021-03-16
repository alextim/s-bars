/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import colors from '../../theme/colors';
import container from '../../theme/container';
import { fontSizes } from '../../theme/font-sizes';

import FooterWidget from './FooterWidget';
import LegalInfo from './LegalInfo';
import FooterNavigation from './FooterNavigation';
import Link from '../LocalizedLink';

import { useTranslation } from '../../i18n';
import { useAppContext } from '../../context';
import useOrganizationContacts from '../../hooks/useOrgContacts';
import useFooterNavItems from '../../hooks/useFooterNavItems';
import useSocialLinks from '../../hooks/useSocialLinks';

import SocialLinks from './SocialLinks';

import styleItemsWrap from '../organization/styleItemsWrap';
// import OrganizationPostalAddress from '../organization/OrganizationPostalAddress';
import OrganizationEmail from '../organization/OrganizationEmail';
import OrganizationOpeningHours from '../organization/OrganizationOpeningHours';
// import OrganizationSite from '../organization/OrganizationSite';
import OrganizationPhones from '../organization/OrganizationPhones';
// import OrganizationCloudPhones from '../organization/OrganizationCloudPhones';
import Button from '../Button';

import styleA from './styleA';

const Container = ({ children }) => <div css={container.header}>{children}</div>;

const styleWidgetWrap = {
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.75,
};

const WidgetWrapper = ({ extraStyle = {}, children }) => (
  <div css={{ ...styleWidgetWrap, ...extraStyle }}>{children}</div>
);

const styleWidgetArea = {
  display: 'grid',
  gridGap: space[6],
  paddingTop: space[5],
  paddingBottom: space[5],
  [mq.lg]: {
    gridTemplateColumns: '1fr 1fr 2fr',
    paddingTop: space[6],
    paddingBottom: space[6],
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
  ...styleA,
};

const styleColophonBottomInnerWrap = {
  fontSize: fontSizes[0],
  display: 'flex',
  justifyContent: 'space-between',
  [mq.lg]: {
    justifyContent: 'center',
  },
};

const footerStyle = {
  color: colors.footer.text,
  backgroundColor: colors.footer.bg,
  fontSize: fontSizes[1],
  width: '100%',
};

const styleInquiryText = {
  marginBottom: space[3],
};

const styleInquiryButton = {
  justifyContent: 'center',
  [mq.lg]: {
    alignSelf: 'flex-start',
  },
};

const Footer = () => {
  const { t } = useTranslation();
  const { email, phone, foundingDate, openingHours } = useOrganizationContacts();
  const { address } = useAppContext();
  const navItems = useFooterNavItems();
  const socialLinks = useSocialLinks();

  return (
    <footer css={footerStyle}>
      <Container>
        <div css={styleWidgetArea}>
          <WidgetWrapper extraStyle={styleA}>
            <FooterWidget title={t('footer.contacts')}>
              <div css={styleItemsWrap}>
                <OrganizationPhones phones={phone} />
                <OrganizationEmail emails={email} />
              </div>
            </FooterWidget>
          </WidgetWrapper>

          <WidgetWrapper extraStyle={styleA}>
            <FooterWidget title={t('footer.opening_time')}>
              <OrganizationOpeningHours openingHours={openingHours} />
            </FooterWidget>
          </WidgetWrapper>

          <WidgetWrapper>
            <FooterWidget title={t('footer.inquiry.title')}>
              <div css={styleInquiryText}>{t('footer.inquiry.text')}</div>
              <Button tag="link" overrideCSS={styleInquiryButton} to="/inquiry/">
                {t('footer.inquiry.button_title')}
              </Button>
            </FooterWidget>
          </WidgetWrapper>
        </div>
      </Container>

      <div css={styleColophonTop}>
        <Container>
          {socialLinks && <SocialLinks items={socialLinks} />}
          <FooterNavigation items={navItems} />
        </Container>
      </div>
      <div css={styleColophonBottom}>
        <Container>
          <div css={styleColophonBottomInnerWrap}>
            <LegalInfo foundingDate={foundingDate} name={address ? address.name : undefined} />
            <Link to="/privacy/">{t('footer.privacyPolicy')}</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
