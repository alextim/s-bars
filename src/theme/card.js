import colors from './colors';
import { fontSizes } from './font-sizes';
import { space } from './space';

const card = {
  wrap: {
    backgroundColor: colors.secondaryBackground,
    ':hover': {
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    },
  },
  heading: {
    margin: 0,
    fontSize: fontSizes[5],
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
