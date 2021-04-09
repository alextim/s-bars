/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import sizes from '../../../theme/sizes';
import colors from '../../../theme/colors';

import MenuItem from './MenuItem';

import styleMenuItemLg from './styleMenuItemLg';

const menuItemWrapStyle = {
  [mq.lg]: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
};

const dropDownWrapStyle = {
  flexDirection: 'column',
  // padding: '0 2rem',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  backgroundColor: colors.header.nav.submenu.bg,

  [mq.lg]: {
    position: 'absolute',
    top: sizes.header.lg,
    backgroundColor: colors.header.bg,
    left: 0,
    boxShadow: '2px 2px 15px 0 rgba(0,0,0,.8)',
    zIndex: 100,
  },
};

const headingWrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',

  [mq.lg]: {
    height: '100%',
  },
};

const menuItemExtraStyle = {
  [mq.lg]: {
    ...styleMenuItemLg,

    ':after': {
      display: 'inline-block',
      content: '""',
      borderStyle: 'solid',
      borderColor: colors.header.nav.item.text,
      borderWidth: '0 1px 1px 0',
      padding: '3px',
      marginLeft: '.5rem',
      transform: 'rotate(45deg)',
    },
  },
};

const styleLi = {
  margin: 0,
};

const SubMenu = ({ title, to, items, path, onClick }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const onMouseEnter = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const onMouseLeave = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  const onClickWrap = (e, href) => {
    if (!href) {
      e.preventDefault();
    }
    toggleVisible();
    onClick(e);
  };

  const toggleStyle = {
    position: 'absolute',
    width: '4rem',
    height: '100%',
    right: 0,
    cursor: 'pointer',

    '&:after': {
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      height: '0.5rem',
      width: '0.5rem',
      content: '""',
      borderStyle: 'solid',
      borderColor: colors.header.nav.item.text,
      borderWidth: '0 1px 1px 0',
      transform: `rotate(${visible ? 225 : 45}deg)`,
    },

    [mq.lg]: {
      display: 'none',
    },
  };

  return (
    <li css={menuItemWrapStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div css={headingWrapStyle}>
        <MenuItem
          isActive={path === to}
          to={to}
          extraStyle={menuItemExtraStyle}
          onClick={(e) => onClickWrap(e, to)}
        >
          {title}
        </MenuItem>
        <div type="button" css={toggleStyle} onTouchStart={toggleVisible} />
      </div>
      <ul css={{ ...dropDownWrapStyle, display: visible ? 'flex' : 'none' }}>
        {items.map((item) => (
          <li key={item.to} css={styleLi}>
            <MenuItem
              isActive={path === item.to}
              to={item.to}
              onClick={(e) => onClickWrap(e, item.to)}
            >
              {item.title}
            </MenuItem>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SubMenu;
