import colors from '@/theme/colors';

const styleError = {
  color: colors.error,
};

const FormErrorMessage = ({ children }) => (children ? <div css={styleError}>{children}</div> : null);

export default FormErrorMessage;
