/** @jsx jsx */
import { jsx } from '@emotion/react';

import { CheckBox } from './inputs';
import FormLabel from './FormLabel';
import FormControl from './FormControl';
import FormErrorMessage from './FormErrorMessage';

const styleInnerWrap = {
  display: 'inline-flex',
  alignItems: 'center',
};

const CheckBoxControl = ({ name, label, value, required, error, onChange, ...props }) => (
  <FormControl isInvalid={error}>
    <div css={styleInnerWrap}>
      <CheckBox
        id={name}
        name={name}
        required={required}
        checked={value}
        onChange={onChange}
        {...props}
      />
      <FormLabel inline right htmlFor={name} required={required}>
        {label}
      </FormLabel>
    </div>
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

export default CheckBoxControl;
