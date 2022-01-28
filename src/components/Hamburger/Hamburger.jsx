import mq from '@/theme/media-queries';
import colors from '@/theme/colors';

const styleSpanCommon = {
  content: '""',
  display: 'block',
  position: 'absolute',
  height: '0.125rem',
  width: '1.25rem',
  borderRadius: '1px',
  transition: 'all 300ms ease-in-out',
};

const HAMBURGER_WIDTH = '2.5rem';
const styleWrap = {
  height: HAMBURGER_WIDTH,
  width: HAMBURGER_WIDTH,
  margin: 0,
  position: 'relative',
  transform: 'rotate(0deg)',
  transition: '0.5s ease-in-out',
  backgroundColor: 'transparent',
  border: 'none',

  [mq.lg]: {
    display: 'none',
    pointerEvents: 'none',
  },
};

const Hamburger = ({ open, onClick }) => {
  const styleSpan = {
    ...styleSpanCommon,
    backgroundColor: open ? 'transparent' : colors.text,

    ':before, :after': {
      ...styleSpanCommon,
      backgroundColor: colors.text,
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
  };

  return (
    <button css={styleWrap} type="button" aria-label={`${open ? 'Close' : 'Open'} menu`} onClick={onClick}>
      <span css={styleSpan} />
    </button>
  );
};

export default Hamburger;
