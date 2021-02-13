import React from 'react';
import FormLabel from './FormLabel';
import FormControl from './FormControl';
import FormErrorMessage from './FormErrorMessage';

import { Select } from './inputs';

const ValueSelect = ({ label, name, items, defaultItem, value, error, onChange }) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Select name={name} value={value} onChange={onChange}>
      {defaultItem && <option value={defaultItem}>{defaultItem}</option>}
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

export default ValueSelect;
