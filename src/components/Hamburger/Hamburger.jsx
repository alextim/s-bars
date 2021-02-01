/** @jsx jsx */
import { jsx } from '@emotion/react';

const Hamburger = ({ w = 2.5, open, bp, onClick }) => {
  const wrapStyle = {
    height: `${w}rem`,
    width: `${w}rem`,
    margin: 0,
    cursor: 'pointer',

    [bp]: {
      display: 'none',
      pointerEvents: 'none',
    },
  };

  const innerWrapStyle = {
    position: 'relative',
    top: 0,
    height: '1.3rem',
    width: '1.9rem',
    marginTop: '1.2rem',
    marginLeft: '0.6rem',
    cursor: 'pointer',
    transform: 'rotate(0deg)',
    transition: '0.5s ease-in-out',
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
    <div css={wrapStyle} type="button" aria-label="Close" onClick={onClick}>
      <div css={innerWrapStyle}>
        <span css={spanStyle} />
      </div>
    </div>
  );
};

export default Hamburger;
