/* eslint-disable jsx-a11y/autocomplete-valid */
/** @jsx jsx */
import { jsx } from '@emotion/react';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: 0,
  width: 0,
  opacity: 0,
  zIndex: -1,
};

const name = 'email';
//  autoComplete="nope"

const HoneyPotInput = ({ value, onChange }) => (
  <label htmlFor={name} css={style}>
    email
    <input
      css={style}
      id={name}
      type={name}
      name={name}
      tabIndex="-1"
      autoComplete="nope"
      placeholder={name}
      value={value}
      onChange={onChange}
    />
  </label>
);

export default HoneyPotInput;
