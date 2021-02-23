import colors from './colors';

const buttons = {
  default: {
    color: colors.button.text,
    backgroundColor: colors.button.bg,
    borderColor: colors.button.border,
    ':hover, :focus': {
      backgroundColor: colors.button.hoverBg,
      borderColor: colors.button.hoverBorder,
      outline: 'none',
    },
  },
  outlined: {
    color: colors.button.text,
    backgroundColor: 'transparent',
    borderColor: colors.button.border,
    ':hover, :focus': {
      backgroundColor: colors.button.hoverBg,
      borderColor: colors.button.hoverBorder,
      // outline: 'none',
    },
  },
};

export default buttons;
