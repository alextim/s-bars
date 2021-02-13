import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BaseformContext } from '../base-forms/BaseformContext';

const EMAIL_MAX_LENGTH = 20;
const emailRules = {
  // validate: validateEmail,
  required: 'Адрес почты является обязательным',
  maxLength: {
    value: EMAIL_MAX_LENGTH,
    message: `Максимальная длина e-mail ${EMAIL_MAX_LENGTH} символов`,
  },
  pattern: {
    // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Недопустимый e-mail.',
  },
};

type Props = {
  customRegister?: any;
  label?: string;
  icon?: boolean;
};

const EmailControl = ({ customRegister, label = 'E-mail', icon = false }: Props) => (
  <BaseformContext.Consumer>
    {(context) =>
      context && (
        <FormControl isInvalid={context.errors.email} mb="1rem">
          {label && <FormLabel htmlFor="email">{label}</FormLabel>}
          {icon ? (
            <InputGroup>
              <InputLeftElement>
                <FontAwesomeIcon icon={['far', 'envelope']} />
              </InputLeftElement>
              <Input
                ref={customRegister ? (el) => customRegister(el, emailRules) : context.register(emailRules)}
                name="email"
                type="email"
                placeholder="Ваш E-mail"
              />
            </InputGroup>
          ) : (
            <Input
              ref={customRegister ? (el) => customRegister(el, emailRules) : context.register(emailRules)}
              name="email"
              type="email"
              placeholder="Ваш E-mail"
            />
          )}

          <FormErrorMessage>{context.errors.email && context.errors.email.message}</FormErrorMessage>
        </FormControl>
      )
    }
  </BaseformContext.Consumer>
);

export default EmailControl;
