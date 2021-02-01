import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import {
  EMAIL_FIELD,
  NAME_PATTERN,
  validateNameLength,
  validateEmailLength,
  validateMessageLength,
} from '../../../../../lib/contact-form-validators';

import useForm from '../../hooks/useForm';
import sendData from '../../services/send-data';

import useModal from '../Modal/useModal';
import { InputControl, TextAreaControl, HoneyPotInput } from '../form-controls';

import ModalContentBase from './ModalContentBase';

const AUTOCLOSE_DELAY = 5000; // in milliseconds
/*
let timer;
const timeout = (ms) =>
  new Promise((resolve) => {
    timer = setTimeout(resolve, ms);
    return timer;
  });

async function sendDataMock() {
  await timeout(4000);
  // throw new Error('test error');
}
*/

const ContactFormBase = ({ content, modalContent, actionControl, endPoint, getErrorMessage }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const validateName = (x) => {
    const value = x ? x.trim() : x;
    if (!validateNameLength(value)) {
      return content.name.validationMessage.length;
    }
    return '';
  };

  const validateEmail = (x) => {
    const value = x ? x.trim() : x;
    if (!validateEmailLength(value)) {
      return content[EMAIL_FIELD].validationMessage.length;
    }
    if (!EmailValidator.validate(value)) {
      return content[EMAIL_FIELD].validationMessage.invalid;
    }
    return '';
  };

  const validateMessage = (x) => {
    const value = x ? x.trim() : x;
    if (!validateMessageLength(value)) {
      return content.message.validationMessage.length;
    }
    return '';
  };

  const validationSchema = {
    email: {},
    name: {
      required: content.name.validationMessage.required,
      validate: validateName,
      pattern: {
        value: NAME_PATTERN,
        message: content.name.validationMessage.pattern,
      },
    },
    [EMAIL_FIELD]: {
      required: content[EMAIL_FIELD].validationMessage.required,
      validate: validateEmail,
    },
    message: {
      required: content.message.validationMessage.required,
      validate: validateMessage,
    },
  };

  const onClose = () => {
    if (loading) {
      // clearTimeout(timer);
      setLoading(false);
    }
  };

  const [Modal, openModal, closeModal] = useModal('portal', { onClose });

  const onSubmitForm = async (values) => {
    setError('');
    setLoading(true);
    try {
      openModal();
      // await sendDataMock();
      return await sendData(values, endPoint);
    } catch (err) {
      // clearTimeout(timer);
      setError(getErrorMessage(err.message));
      return false;
    } finally {
      setLoading(false);
      closeModal(AUTOCLOSE_DELAY);
    }
  };

  const { values, errors, handleOnChange, handleOnSubmit /* , disable */ } = useForm(
    validationSchema,
    onSubmitForm,
  );

  return (
    <>
      <Modal>
        <ModalContentBase
          content={modalContent}
          loading={loading}
          cancel={closeModal}
          error={error}
        />
      </Modal>

      <form onSubmit={handleOnSubmit} noValidate>
        <HoneyPotInput value={values.email} onChange={handleOnChange} />
        <InputControl
          label={content.name.label}
          name="name"
          required={validationSchema.name.required}
          placeholder={content.name.placeholder}
          value={values.name}
          error={errors.name}
          onChange={handleOnChange}
        />
        <InputControl
          label={content[EMAIL_FIELD].label}
          name={EMAIL_FIELD}
          type="email"
          required={validationSchema[EMAIL_FIELD].required}
          placeholder={content[EMAIL_FIELD].placeholder}
          value={values[EMAIL_FIELD]}
          error={errors[EMAIL_FIELD]}
          onChange={handleOnChange}
        />
        <TextAreaControl
          label={content.message.label}
          name="message"
          required={validationSchema.message.required}
          placeholder={content.message.placeholder}
          value={values.message}
          error={errors.message}
          onChange={handleOnChange}
        />
        {actionControl}
      </form>
    </>
  );
};

export default ContactFormBase;
