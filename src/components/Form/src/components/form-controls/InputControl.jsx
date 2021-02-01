/** @jsx jsx */
import { jsx } from '@emotion/react';

const styleControlWrap = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
};

const styleError = (t) => ({
  color: t.colors.error,
});

const Input = ({ invalid, ...props }) => (
  <input
    {...props}
    css={(t) => ({
      borderColor: invalid ? t.colors.error : t.colors.body,
    })}
  />
);

const TextArea = ({ invalid, ...props }) => (
  <textarea
    {...props}
    css={(t) => ({
      borderColor: invalid ? t.colors.error : t.colors.body,
    })}
  />
);

const FormLabel = ({ required, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    css={(t) => ({
      marginBottom: '0.25rem',
      '&::after': {
        content: `"${required ? '*' : ''}"`,
        color: t.colors.brand.main,
        marginLeft: '0.25rem',
      },
    })}
    {...props}
  />
);

const InputControl = ({ name, label, type, value, required, error, onChange, ...props }) => (
  <div css={styleControlWrap}>
    {label && (
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
    )}
    <Input
      id={name}
      name={name}
      type={type || 'text'}
      required={required}
      value={value}
      invalid={error}
      onChange={onChange}
      {...props}
    />
    {error && <div css={styleError}>{error}</div>}
  </div>
);

const TextAreaControl = ({ name, label, value, required, error, onChange, ...props }) => (
  <div css={styleControlWrap}>
    {label && (
      <FormLabel htmlFor={name} isrequired={required}>
        {label}
      </FormLabel>
    )}
    <TextArea
      id={name}
      name={name}
      required={required}
      value={value}
      invalid={error}
      onChange={onChange}
      rows="10"
      {...props}
    />
    {error && <div css={styleError}>{error}</div>}
  </div>
);

export { TextAreaControl };
export default InputControl;
