import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Textarea } from '@chakra-ui/core';

import { BaseformContext } from '../base-forms/BaseformContext';

interface IProps {
  label?: string;
  required?: boolean;
  customRegister?: any;
}
const NoteControl: React.FC<IProps> = ({ label = 'Сообщение', required = true, customRegister, ...props }) => {
  const noteRules = {
    required: required ? `Поле "${label}" является обязательным` : false,
  };
  return (
    <BaseformContext.Consumer>
      {(context) =>
        context && (
          <FormControl isInvalid={context.errors.note}>
            <FormLabel htmlFor="note">{label}</FormLabel>
            <Textarea
              ref={customRegister ? (el) => customRegister(el, noteRules) : context.register(noteRules)}
              name="note"
              placeholder="Ваш текст"
              mb="1rem"
              {...props}
            />
            <FormErrorMessage>{context.errors.note && context.errors.note.message}</FormErrorMessage>
          </FormControl>
        )
      }
    </BaseformContext.Consumer>
  );
};

export default NoteControl;
