/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

import colors from '../../../theme/colors';
import mq from '../../../theme/media-queries';
import fontWeights from '../../../theme/font-weights';

const style = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '1rem 2rem',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  touchAction: 'none',
  opacity: 1,
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontWeight: fontWeights.semibold,

  color: colors.header.nav.item.text,
  borderBottom: '1px solid',
  borderBottomColor: colors.header.nav.item.borderColor,

  '&:first-of-type': {
    borderTop: '1px solid',
    borderTopColor: colors.header.nav.item.borderColor,
  },

  '&:hover, &:active, &:focus': {
    textDecoration: 'none',
    outline: '0',
  },

  '&:focus': {
    backgroundColor: colors.header.nav.item.focusBg,
  },

  '&:hover': {
    color: colors.highlight,
    backgroundColor: colors.header.nav.item.hoverBg,
  },

  '&:active': {
    backgroundColor: colors.header.nav.item.activeBg,
  },

  [mq.lg]: {
    padding: '0 1rem',
    borderBottom: 0,
    '&:first-of-type': {
      borderTop: 0,
    },
  },
};

const activeStyle = {
  boxShadow: `0 -2px 0 ${colors.header.nav.item.boxShadowColor} inset`,
};

const MenuItem1 = ({ children, to, isActive, onClick }) => (
  <Link css={{ ...style, ...(isActive ? activeStyle : {}) }} to={to} onClick={onClick}>
    {children}
  </Link>
);

export default MenuItem1;
