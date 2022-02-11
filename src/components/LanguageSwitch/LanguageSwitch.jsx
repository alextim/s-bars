// eslint-disable-next-line import/no-unresolved
import { Location } from '@reach/router';
import { Link } from 'gatsby';

import colors from '@/theme/colors';

import i18n from '@/i18n/i18n';
import { useLocale } from '@/i18n/i18n-context';
import useAllSitePath from '@/hooks/useAllSitePath';

const styleWrapDefault = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const styleItemWrap = {
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

const styleItem = {
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

const styleActiveItem = {
  ...styleItem,
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

const LanguageSwitch = ({ closeMenu }) => {
  const { locale } = useLocale();
  const allPathes = useAllSitePath();

  if (!i18n.i18nEnabled) {
    return null;
  }

  return (
    <Location>
      {({ location: { pathname } }) => (
        <div css={styleWrapDefault}>
          {i18n.localeCodes.map((code) => {
            const { shortName } = i18n.locales[code];
            const isCurrent = locale === code;
            return (
              <div key={code} css={styleItemWrap}>
                {/* <div key={code} className="lang-switch-item" css={styleItemWrap}> */}
                <Link
                  css={isCurrent ? styleActiveItem : styleItem}
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
