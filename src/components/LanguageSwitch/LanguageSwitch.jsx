/** @jsx jsx */
import { jsx } from '@emotion/react';
// eslint-disable-next-line import/no-unresolved
import { Location } from '@reach/router';
import { Link } from 'gatsby';

import colors from '../../theme/colors';

import { localizePath, i18nEnabled, locales, localeCodes } from '../../i18n/i18n';
import { useLocale } from '../../i18n/i18n-context';

const wrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const itemWrapStyle = {
  ':after': {
    content: '"|"',
    marginLeft: '0.4rem',
    marginRight: '0.4rem',
  },
  ':last-child': {
    '&::after': {
      content: '""',
      marginLeft: 0,
      marginRight: 0,
    },
  },
};

const itemStyle = {
  color: colors.header.text,
  textTransform: 'uppercase',
  '&:active, &:focus, &:hover': {
    outline: 'none',
    textDecoration: 'none',
  },
  '&:hover': {
    color: colors.highlight,
  },
};

const activeItemStyle = {
  color: colors.header.nav.languageSwitch.selected,
};

const nonActiveItemStyle = {};

const LanguageSwitch = ({ closeMenu }) => {
  const { locale } = useLocale();

  if (!i18nEnabled) {
    return null;
  }

  const toPage = (p) => {
    const n = p.length;
    if (n <= 3) {
      return '';
    }
    return p
      .split(/\/[a-z]{2}\//)
      .pop()
      .replace(/^\/+/, '');
  };

  return (
    <Location>
      {({ location: { pathname } }) => (
        <div css={wrapStyle}>
          {localeCodes.map((code) => {
            const { shortName, shortLocalName } = locales[code];
            const isCurrent = locale === code;
            return (
              <div key={code} css={itemWrapStyle}>
                <Link
                  css={{
                    ...itemStyle,
                    ...(isCurrent ? activeItemStyle : nonActiveItemStyle),
                  }}
                  to={localizePath(`/${toPage(pathname)}`, code)}
                  onClick={closeMenu}
                >
                  {isCurrent ? shortLocalName : shortName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </Location>
  );
};

export default LanguageSwitch;
