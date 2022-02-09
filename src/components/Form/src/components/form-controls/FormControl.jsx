import colors from '@/theme/colors';

const FormControl = ({ children, isInvalid }) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    '> input, > textarea': {
      borderColor: isInvalid ? colors.error : colors.body,
    },
  };
  return <div css={style}>{children}</div>;
};
export default FormControl;
