/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Location } from '@reach/router';
import LanguageSwitch from '../../LanguageSwitch';
import mq from '../../../theme/media-queries';
import sizes from '../../../theme/sizes';

import MenuItem from './MenuItem2';
import SubMenu from './SubMenu';

const styleWrapper = {
  flex: 1,
  minWidth: '50%',

  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'inherit',

  position: 'absolute',
  top: sizes.header.sm,
  height: `calc(100vh - ${sizes.header.sm})`,

  // no drop-down submenu
  overflow: 'hidden',
  // overflowY: 'auto',

  transition: 'transform 0.5s linear',
  willChange: 'transform',

  // menu hidden by default on small screens
  pointerEvents: 'none',
  visibility: 'hidden',
  transform: 'translateX(-110 %)',

  width: '100%',
  margin: 'auto',
  left: 0,
  zIndex: 201,

  [mq.lg]: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignIitems: 'center',
    justifyContent: 'space-between',

    position: 'static',
    top: 0,
    height: '100%',

    // drop-down submenu visible
    overflow: 'visible',

    transition: 'unset !important',
    willChange: 'unset !important',

    // menu alwais visible on large screens
    pointerEvents: 'auto !important',
    visibility: 'visible !important',
    transform: 'none !important',
  },
};

const styleMenuWrapper = {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  [mq.lg]: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignIitems: 'center',
  },
};

const styleRightWrapper = {
  display: 'inline-flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem 0',
  [mq.lg]: {
    // display: 'inline-flex',
    // flexDirection: 'row',
    alignIitems: 'center',
  },
};

const styleWrapperOpened = {
  pointerEvents: 'auto',
  visibility: 'visible',
  transform: 'unset',
};

const isRoot = (path) => path === '/';

// Removes one or more trailing slashes from URL
const removeTrailingSlashes = (url) => url.replace(/\/+$/, '');

const menuItemWrapStyle = {
  margin: 0,
  [mq.lg]: {
    display: 'inline-flex',
    alignIitems: 'center',
  },
};

const stripLastSlashes = (path) => (isRoot(path) ? path : removeTrailingSlashes(path));

const Menu2 = ({ navItems, isMenuOpen, setIsMenuOpen }) => {
  const onClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  return (
    <Location>
      {({ location: { pathname } }) => {
        const path = stripLastSlashes(pathname);
        return (
          <div css={{ ...styleWrapper, ...(isMenuOpen ? styleWrapperOpened : {}) }}>
            <ul css={styleMenuWrapper}>
              {navItems.map(({ title, to, submenu }, i) => {
                if (submenu && Array.isArray(submenu)) {
                  return (
                    <SubMenu
                      key={i}
                      to={to}
                      title={title}
                      items={submenu}
                      path={path}
                      onClick={onClick}
                    />
                  );
                }
                return (
                  <li key={i} css={menuItemWrapStyle}>
                    <MenuItem to={to} isActive={to === path} onClick={onClick}>
                      {title}
                    </MenuItem>
                  </li>
                );
              })}
            </ul>
            <div css={styleRightWrapper}>
              <LanguageSwitch closeMenu={() => setIsMenuOpen(false)} />
            </div>
          </div>
        );
      }}
    </Location>
  );
};

export default Menu2;
