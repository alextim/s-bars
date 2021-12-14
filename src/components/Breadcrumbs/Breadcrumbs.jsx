/* eslint-disable jsx-a11y/no-redundant-roles */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { space } from '../../theme/space';
import { fontSizes } from '../../theme/font-sizes';

import Icon from '../Icon';

const styleList = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
  fontSize: fontSizes[1],

  color: 'currentColor',
  marginTop: space[2],

  a: {
    display: 'inline-flex',
    alignItems: 'center',

    '::after': {
      content: '""',
      display: 'block',
      width: '0.4rem',
      height: '0.4rem',
      borderTop: '0.125rem solid currentColor',
      borderRight: '0.125rem solid currentColor',
      transform: 'rotate(45deg)',
      opacity: '.8',
      margin: '0 0.5rem',
    },
  },
};

const styleItem = {
  verticalAlign: 'middle',
  color: 'currentColor',
};

const styleIcon = {
  width: '1rem',
  height: '1rem',
};

const Breadcrumbs = ({ items }) => {
  if (!items || !items.length) {
    return null;
  }
  const home = items[0];
  const last = items[items.length - 1];
  return (
    <nav aria-label="breadcrumbs" css={styleList}>
      <a style={styleItem} href={home.to}>
        <Icon name="home" css={styleIcon} />
      </a>
      {items.slice(1, -1).map(({ to, title }) => (
        <a key={to} style={styleItem} href={to}>
          {title}
        </a>
      ))}
      <span css={styleItem}>{last.title}</span>
    </nav>
  );
};

export default Breadcrumbs;
