import colors from '@/theme/colors';

const FormLabel = ({ required, htmlFor, children, inline, right, overrideCSS, ...props }) =>
  children ? (
    <label
      htmlFor={htmlFor}
      css={[
        {
          margin: `0 ${inline ? '0.25rem' : 0} ${inline || right ? 0 : '0.25rem'} ${right ? '0.5rem' : 0}`,
          '&::after': {
            content: `"${required ? '*' : ''}"`,
            color: colors.input.required,
            marginLeft: '0.25rem',
          },
        },
        overrideCSS,
      ]}
      {...props}
    >
      {children}
    </label>
  ) : null;
export default FormLabel;
