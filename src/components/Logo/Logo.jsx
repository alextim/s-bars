/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

import utils from '@alextim/utils';

import i18n from '../../i18n';
import { useLocale } from '../../i18n/i18n-context';
import useOrgContacts from '../../hooks/useOrgContacts';

import mq from '../../theme/media-queries';
import colors from '../../theme/colors';
import fontWeights from '../../theme/font-weights';
import { fontSizes } from '../../theme/font-sizes';

const SITE_LOGO = '/assets/images/logo.svg';

const styleWrap = {
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',

  a: {
    color: colors.header.nav.item.text,
  },

  'a:hover, a:active, a:focus': {
    textDecoration: 'none',
  },

  [mq.lg]: {
    marginRight: '3rem',
  },
};

const styleImageLink = {
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '1rem',
};

const styleTextWrap = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

const styleHomeLink = {
  fontWeight: fontWeights.bold,
  fontSize: fontSizes[3],
};

const styleImg = {
  width: '3rem',
  height: '3rem',

  [mq.lg]: {
    width: '3.7rem',
    height: '3.7rem',
  },
};

const Logo = ({ onClick }) => {
  const { locale } = useLocale();
  const { phone } = useOrgContacts();
  const to = i18n.localizePath('/', locale);
  return (
    <div css={styleWrap}>
      <Link css={styleImageLink} to={to} onClick={onClick}>
        <img
          src={SITE_LOGO}
          alt={i18n.locales[locale].siteTitle}
          height="48"
          width="48"
          css={styleImg}
        />
      </Link>
      <div css={styleTextWrap}>
        <Link to={to} onClick={onClick} css={styleHomeLink}>
          {i18n.locales[locale].siteShortName}
        </Link>
        <a href={utils.phoneUrl(phone[0])}>{utils.formatPhone(phone[0])}</a>
      </div>
    </div>
  );
};

export default Logo;
