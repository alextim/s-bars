import colors from '@/theme/colors';

const FormControl = ({ children, isInvalid }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      '> input, > textarea': {
        borderColor: isInvalid ? colors.error : colors.body,
      },
    }}
  >
    {children}
  </div>
);

export default FormControl;
