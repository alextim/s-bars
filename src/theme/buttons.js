import { /* colors, */ brand } from './colors';

const common = {
  textTransform: 'uppercase',
  outline: 0,
  '&:hover': {
    bg: brand.secondDark,
    borderColor: brand.secondDark,
  },
};

const buttons = {
  primary: {
    color: 'background',
    bg: 'primary',
    ...common,
  },

  secondary: {
    color: 'background',
    bg: 'secondary',
    ...common,
  },
};

export const links = { ...buttons };

export default buttons;
