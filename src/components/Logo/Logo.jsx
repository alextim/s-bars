/** @jsx jsx */
import { jsx } from '@emotion/react';

import Link from '../LocalizedLink';
import { useLocale } from '../../i18n/i18n-context';
import i18n from '../../i18n';
import useOrganization from '../../hooks/useOrganization';
import Utils from '../../lib/utils';

const wrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '3rem',
  height: '100%',
};

const linkStyle = {
  height: '100%',
  marginRight: '0.5rem',
};

const imgStyle = {
  width: 'auto',
  height: '100%',
};

const textWrapStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const phoneStyle = (t) => ({
  marginLeft: '1rem',
  [t.mq.lg]: {
    marginLeft: '0',
  },
});

const Logo = ({ onClick }) => {
  const { locale } = useLocale();
  const { phone } = useOrganization();
  return (
    <div css={wrapStyle}>
      <Link css={linkStyle} to="/" onClick={onClick}>
        <img src="/assets/logo-s-bars.jpg" alt={i18n.locales[locale].siteTitle} css={imgStyle} />
      </Link>
      <div css={textWrapStyle}>
        <Link to="/" onClick={onClick}>
          {i18n.locales[locale].siteShortName}
        </Link>
        <a href={Utils.phoneUrl(phone[0])} css={phoneStyle}>
          {Utils.formatPhone(phone[0])}
        </a>
      </div>
    </div>
  );
};

export default Logo;
