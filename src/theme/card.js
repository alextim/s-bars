import colors from './colors';
import { fontSizes } from './font-sizes';
import fonts from './fonts';
import { space } from './space';

const card = {
  perRow: {
    md: 2,
    lg: 3,
  },
  wrap: {
    backgroundColor: colors.secondaryBackground,
    ':hover': {
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    },
  },
  heading: {
    margin: 0,
    fontSize: fontSizes[5],
    fontFamily: fonts.body,
  },
  textWrap: {
    padding: space[4],
  },
  link: {
    color: colors.text,
    ':hover, :focus, :active': {
      textDecoration: 'none',
    },
  },
};

export default card;
