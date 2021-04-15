/** @jsx jsx */
import { jsx } from '@emotion/react';
// eslint-disable-next-line import/no-unresolved
import { Location } from '@reach/router';
import { Link } from 'gatsby';

import useAllSitePath from '../../hooks/useAllSitePath';
import colors from '../../theme/colors';

import i18n from '../../i18n/i18n';
import { useLocale } from '../../i18n/i18n-context';

const wrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const itemWrapStyle = {
  ':after': {
    content: '"|"',
    margin: '0 0.4rem',
  },
  ':last-child': {
    ':after': {
      content: '""',
      margin: 0,
    },
  },
};

const itemStyle = {
  color: colors.header.text,
  textTransform: 'uppercase',
  ':active, :focus, :hover': {
    outline: 'none',
    textDecoration: 'none',
  },
  ':hover': {
    color: colors.highlight,
  },
};

const activeItemStyle = {
  color: colors.header.nav.languageSwitch.selected,
};

const getSafePath = (pathname, code, allPathes) => {
  const alternatePath = i18n.localizePath(i18n.purePath(pathname), code);
  const isPathExist = (x) => allPathes.some(({ node: { path } }) => path === x);

  if (isPathExist(alternatePath)) {
    return alternatePath;
  }
  /*
  const a = alternatePath.split('/');
  a.pop();
  a.pop();
  if (a[a.length - 1] !== '') {
    a.push('');
  }
  const nextPath = a.join('/');
  if (isPathExist(nextPath)) {
    return nextPath;
  }
  */
  return i18n.localizePath('/', code);
};

const LanguageSwitch = ({ closeMenu, extraStyle = {} }) => {
  const { locale } = useLocale();
  const allPathes = useAllSitePath();

  if (!i18n.i18nEnabled) {
    return null;
  }

  return (
    <Location>
      {({ location: { pathname } }) => (
        <div css={{ ...wrapStyle, ...extraStyle }}>
          {i18n.localeCodes.map((code) => {
            const { shortName } = i18n.locales[code];
            const isCurrent = locale === code;
            return (
              <div key={code} className="lang-switch-item" css={itemWrapStyle}>
                <Link
                  css={{
                    ...itemStyle,
                    ...(isCurrent ? activeItemStyle : {}),
                  }}
                  to={isCurrent ? pathname : getSafePath(pathname, code, allPathes)}
                  onClick={closeMenu}
                >
                  {shortName}
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
