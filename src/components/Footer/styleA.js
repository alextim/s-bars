import colors from '../../theme/colors';

const styleA = {
  a: {
    color: colors.footer.text,
    '&:active, &:focus, &:hover': {
      outline: 'none',
      textDecoration: 'none',
    },
    ':hover': {
      color: colors.footer.highlight,
    },
  },
};

export default styleA;
