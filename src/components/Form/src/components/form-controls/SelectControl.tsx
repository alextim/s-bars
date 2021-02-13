import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Select, InputGroup, InputLeftElement } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-common-types';

import { BaseformContext } from '../base-forms/BaseformContext';
import { IKeyValuePair } from '../../../lib/types';

const selectRules = {};

type Props = {
  items: Array<IKeyValuePair>;
  customRegister?: any;
  name: string;
  label?: React.ReactNode;
  icon?: IconName | [IconPrefix, IconName];
  selected: number;
};

const SelectControl = ({ items, customRegister, name, label, icon, selected }: Props) => (
  <BaseformContext.Consumer>
    {(context) =>
      context && (
        <FormControl isInvalid={context.errors[name]} mb="1rem">
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          {icon ? (
            <InputGroup>
              <InputLeftElement>
                <FontAwesomeIcon icon={icon} />
              </InputLeftElement>
              <Select
                ref={customRegister ? (el) => customRegister(el, selectRules) : context.register(selectRules)}
                name={name}
                defaultValue={items[selected].key}
              >
                {items.map((item, i) => {
                  return (
                    <option key={i} value={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </Select>
            </InputGroup>
          ) : (
            <Select
              ref={customRegister ? (el) => customRegister(el, selectRules) : context.register(selectRules)}
              name={name}
              defaultValue={items[selected].key}
            >
              {items.map((item, i) => (
                <option key={i} value={item.key}>
                  {item.value}
                </option>
              ))}
            </Select>
          )}

          <FormErrorMessage>{context.errors.email && context.errors.email.message}</FormErrorMessage>
        </FormControl>
      )
    }
  </BaseformContext.Consumer>
);

export default SelectControl;
