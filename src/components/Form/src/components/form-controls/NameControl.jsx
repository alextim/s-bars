import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/core';

import { BaseformContext } from '../base-forms/BaseformContext';

type Props = {
  customRegister?: any;
  controlName: string;
  label: string;
  placeholder: string;
  maxLength: number;
  required: boolean;
};

const NameControl = ({ customRegister, controlName, label, placeholder, maxLength, required = true }: Props) => {
  const nameRules = {
    // validate: validateName,
    required: required ? `Поле "${label}" является обязательным` : false,
    maxLength: {
      value: maxLength,
      message: `Максимальная длина ${maxLength} символов`,
    },
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ\s]*$/,
      message: 'Допускаются только буквы и пробел.',
    },
  };

  return (
    <BaseformContext.Consumer>
      {(context) =>
        context && (
          <FormControl isInvalid={context.errors[controlName]} mb="1rem">
            <FormLabel htmlFor={controlName}>{label}</FormLabel>
            <Input
              ref={customRegister ? (el) => customRegister(el, nameRules) : context.register(nameRules)}
              name={controlName}
              placeholder={placeholder}
            />

            <FormErrorMessage>{context.errors[controlName] && context.errors[controlName].message}</FormErrorMessage>
          </FormControl>
        )
      }
    </BaseformContext.Consumer>
  );
};

export default NameControl;
