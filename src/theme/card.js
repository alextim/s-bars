import colors from './colors';
import { fontSizes } from './font-sizes';
import fontWeights from './font-weights';
import fonts from './fonts';
import { space } from './space';

const borderRadius = '4px';

const card = {
  perRow: {
    md: 2,
    lg: 3,
  },
  wrap: {
    backgroundColor: colors.secondaryBackground,
    borderRadius,
    ':hover': {
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    },
    img: {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
  },
  heading: {
    margin: 0,
    fontSize: fontSizes[5],
    fontFamily: fonts.body,
    fontWeight: fontWeights.heading,
    textTransform: 'none',
    textAlign: 'unset',
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
