/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import mq from '../../../theme/media-queries';
import sizes from '../../../theme/sizes';

import MenuItem from './MenuItem1';

const styleWrapper = {
  flex: 1,
  minWidth: '50%',

  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'inherit',

  position: 'absolute',
  top: sizes.header.sm,
  height: `calc(100vh - ${sizes.header.sm})`,

  overflow: 'hidden',

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
    flexDirection: 'row',

    position: 'static',
    top: 0,
    height: '100%',

    transition: 'unset !important',
    willChange: 'unset !important',

    // menu alwais visible on large screens
    pointerEvents: 'auto !important',
    visibility: 'visible !important',
    transform: 'none !important',
  },
};

const styleRightWrapper = {
  display: 'flex',
  flexDirection: 'column',
  [mq.lg]: {
    flexDirection: 'row',
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

const stripLastSlashes = (path) => {
  if (isRoot(path)) {
    return path;
  }
  return removeTrailingSlashes(path);
};

const Menu1 = ({ navItems, isMenuOpen, setIsMenuOpen }) => {
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
            {navItems.map(({ title, to }, i) => (
              <MenuItem key={i} to={to} isActive={to === path} onClick={onClick}>
                {title}
              </MenuItem>
            ))}
            <div css={styleRightWrapper} />
          </div>
        );
      }}
    </Location>
  );
};

export default Menu1;
