/** @jsx jsx */
import { jsx } from '@emotion/react';

import Link from '../LocalizedLink';
import { useLocale } from '../../i18n/i18n-context';
import i18n from '../../i18n';
import useOrganization from '../../hooks/useOrganization';
import Utils from '../../lib/utils';

import colors from '../../theme/colors';
import fontWeights from '../../theme/font-weights';

const styleWrap = {
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '3rem',
  height: '100%',
  a: {
    color: colors.header.nav.item.text,
  },
  'a:hover, a:active, a:focus': {
    textDecoration: 'none',
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
  fontWeight: fontWeights.semibold,
};

const styleImg = {
  width: '2.5rem',
  height: '2.5rem',
};

const Logo = ({ onClick }) => {
  const { locale } = useLocale();
  const { phone } = useOrganization();
  return (
    <div css={styleWrap}>
      <Link css={styleImageLink} to="/" onClick={onClick}>
        <img
          src="/assets/logo-s-bars.svg"
          alt={i18n.locales[locale].siteTitle}
          height="40"
          width="40"
          css={styleImg}
        />
      </Link>
      <div css={styleTextWrap}>
        <a href="/" onClick={onClick} css={styleHomeLink}>
          {i18n.locales[locale].siteShortName}
        </a>
        <a href={Utils.phoneUrl(phone[0])}>{Utils.formatPhone(phone[0])}</a>
      </div>
    </div>
  );
};

export default Logo;
