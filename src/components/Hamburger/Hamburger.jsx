/** @jsx jsx */
import { jsx } from '@emotion/react';

const Hamburger = ({ w = 2.5, m = 0, open, bp, onClick }) => {
  const wrapStyle = {
    height: `${w}rem`,
    width: `${w}rem`,
    margin: m,
    position: 'relative',
    transform: 'rotate(0deg)',
    transition: '0.5s ease-in-out',
    backgroundColor: 'transparent',
    border: 'none',

    [bp]: {
      display: 'none',
      pointerEvents: 'none',
    },
  };

  const commonSpanStyle = {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: '0.125rem',
    width: '1.25rem',
    borderRadius: '1px',
    transition: 'all 300ms ease-in-out',
  };

  const spanStyle = (t) => ({
    ...commonSpanStyle,
    backgroundColor: open ? 'transparent' : t.colors.text,

    ':before, :after': {
      backgroundColor: t.colors.text,
      ...commonSpanStyle,
    },

    ':before': {
      top: open ? 0 : '-0.625rem',
      transform: open ? 'rotate(45deg)' : 'none',
    },

    ':after': {
      top: open ? 0 : '0.625rem',
      bottom: '-0.625rem',
      transform: open ? 'rotate(-45deg)' : 'none',
    },
  });

  return (
    <button
      css={wrapStyle}
      type="button"
      aria-label={`${open ? 'Close' : 'Open'} menu`}
      onClick={onClick}
    >
      <span css={spanStyle} />
    </button>
  );
};

export default Hamburger;
