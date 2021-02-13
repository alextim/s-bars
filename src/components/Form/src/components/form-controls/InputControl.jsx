/** @jsx jsx */
import { jsx } from '@emotion/react';

import Input, { TextArea } from './inputs';
import FormLabel from './FormLabel';
import FormControl from './FormControl';
import FormErrorMessage from './FormErrorMessage';

const InputControl = ({
  name,
  label,
  type = 'text',
  value,
  required,
  error,
  onChange,
  ...props
}) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={name} required={required}>
      {label}
    </FormLabel>
    <Input
      id={name}
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      {...props}
    />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

const TextAreaControl = ({ name, label, value, required, error, onChange, ...props }) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={name} isrequired={required}>
      {label}
    </FormLabel>
    <TextArea
      id={name}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      rows="10"
      {...props}
    />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

export { TextAreaControl };
export default InputControl;
