import FormLabel from './FormLabel';
import FormControl from './FormControl';
import FormErrorMessage from './FormErrorMessage';

import { Select } from './inputs';

const KeyValueSelect = ({ label, name, items, defaultItem, value, error, onChange }) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Select name={name} value={value} onChange={onChange}>
      {defaultItem && <option value={defaultItem.key}>{defaultItem.value}</option>}
      {items.map((item) => (
        <option key={item.key} value={item.key}>
          {item.value}
        </option>
      ))}
    </Select>
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

export default KeyValueSelect;
