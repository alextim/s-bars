import React, { useState } from 'react';

import fieldsInfo from '../../../../../lib/contact-form-fields';
import EMAIL_FIELD from '../../../../../lib/email-field';

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

const styleControlsWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[6],
});

const ContactFormBase = ({ fields, modalContent, actionControl, endPoint, getErrorMessage }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const validateName = (x) => {
    const value = x ? x.trim() : x;
    const n = value ? value.length : 0;
    if (n < fieldsInfo.name.minLength || n > fieldsInfo.name.maxLength) {
      return fields.name.validationMessage.length;
    }
    return '';
  };

  const validateEmail = (x) => {
    const value = x ? x.trim() : x;
    const n = value ? value.length : 0;
    if (n < fieldsInfo[EMAIL_FIELD].minLength || n > fieldsInfo[EMAIL_FIELD].maxLength) {
      return fields[EMAIL_FIELD].validationMessage.length;
    }
    if (!fieldsInfo[EMAIL_FIELD].validate(value)) {
      return fields[EMAIL_FIELD].validationMessage.invalid;
    }
    return '';
  };

  const validateMessage = (x) => {
    const value = x ? x.trim() : x;
    const n = value ? value.length : 0;
    if (n < fieldsInfo.message.minLength || n > fieldsInfo.message.maxLength) {
      return fields.message.validationMessage.length;
    }
    return '';
  };

  const validationSchema = {
    email: {},
    name: {
      required: fields.name.validationMessage.required,
      validate: validateName,
      pattern: {
        value: fieldsInfo.name.pattern,
        message: fields.name.validationMessage.pattern,
      },
    },
    [EMAIL_FIELD]: {
      required: fields[EMAIL_FIELD].validationMessage.required,
      validate: validateEmail,
    },
    message: {
      required: fields.message.validationMessage.required,
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
        <div css={styleControlsWrap}>
          <InputControl
            label={fields.name.label}
            name="name"
            required={validationSchema.name.required}
            placeholder={fields.name.placeholder}
            value={values.name}
            error={errors.name}
            onChange={handleOnChange}
          />
          <InputControl
            label={fields[EMAIL_FIELD].label}
            name={EMAIL_FIELD}
            type="email"
            required={validationSchema[EMAIL_FIELD].required}
            placeholder={fields[EMAIL_FIELD].placeholder}
            value={values[EMAIL_FIELD]}
            error={errors[EMAIL_FIELD]}
            onChange={handleOnChange}
          />
          <TextAreaControl
            label={fields.message.label}
            name="message"
            required={validationSchema.message.required}
            placeholder={fields.message.placeholder}
            value={values.message}
            error={errors.message}
            onChange={handleOnChange}
          />
          {actionControl}
        </div>
      </form>
    </>
  );
};

export default ContactFormBase;
