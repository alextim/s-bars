import colors from '@/theme/colors';

const FormLabel = ({ required, htmlFor, children, inline, right, overrideCSS = {}, ...rest }) => {
  if (!children) {
    return null;
  }
  const style = {
    margin: `0 ${inline ? '0.25rem' : 0} ${inline || right ? 0 : '0.25rem'} ${right ? '0.5rem' : 0}`,
    '&::after': {
      content: `"${required ? '*' : ''}"`,
      color: colors.input.required,
      marginLeft: '0.25rem',
    },
    ...overrideCSS,
  };

  return (
    <label htmlFor={htmlFor} css={style} {...rest}>
      {children}
    </label>
  );
};

export default FormLabel;
