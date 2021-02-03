/** @jsx jsx */
import { jsx } from '@emotion/react';

import Link from '../LocalizedLink';
import { useLocale } from '../../i18n/i18n-context';
import i18n from '../../i18n';
import useOrganization from '../../hooks/useOrganization';
import Utils from '../../lib/utils';

const styleWrap = (t) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '3rem',
  height: '100%',
  a: {
    color: t.colors.header.nav.item.text,
  },
  'a:hover, a:active, a:focus': {
    textDecoration: 'none',
  },
});

const styleLink = {
  height: '100%',
  marginRight: '0.5rem',
};

const styleImg = {
  marginTop: '2px',
  width: 'auto',
  height: '90%',
};

const styleTextWrap = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const styleHomeLink = (t) => ({
  fontWeight: t.fontWeights.semibold,
});
const stylePhone = (t) => ({
  marginLeft: '1rem',
  [t.mq.lg]: {
    marginLeft: '0',
  },
});

const Logo = ({ onClick }) => {
  const { locale } = useLocale();
  const { phone } = useOrganization();
  return (
    <div css={styleWrap}>
      <Link css={styleLink} to="/" onClick={onClick}>
        <img src="/assets/logo-s-bars.svg" alt={i18n.locales[locale].siteTitle} css={styleImg} />
      </Link>
      <div css={styleTextWrap}>
        <Link to="/" onClick={onClick} css={styleHomeLink}>
          {i18n.locales[locale].siteShortName}
        </Link>
        <a href={Utils.phoneUrl(phone[0])} css={stylePhone}>
          {Utils.formatPhone(phone[0])}
        </a>
      </div>
    </div>
  );
};

export default Logo;
