import colors from './colors';

const { brand } = colors;

const common = {
  textTransform: 'uppercase',
  outline: 0,
  ':hover': {
    backgroundColor: brand.secondDark,
    borderColor: brand.secondDark,
  },
};

const buttons = {
  primary: {
    color: colors.background,
    backgroundColor: colors.primary,
    ...common,
  },

  secondary: {
    color: colors.background,
    backgroundColor: colors.secondary,
    ...common,
  },
};

export default buttons;
