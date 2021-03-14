/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';

import {
  EMAIL_FIELD,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  MESSAGE_MAX_LENGTH,
} from '../../../lib/form/contact-form-fields';

import { useTranslation } from '../../../i18n';

import { ContactFormBase } from '../../Form';
import Spinner from '../../Spinner';

import useModal from '../../Form/src/components/Modal/useModal';
import { ModalHeader, ModalFooter, ModalBody } from '../../Form/src/components/Modal';

import Button from '../../Button';

const END_POINT = '/.netlify/functions/contact';

const spinnerStyle = (t) => ({ display: 'block', marginTop: t.space[7] });

const useInquiryForm = () => {
  const { t } = useTranslation();

  const NAME_LABEL = t('cf.name');
  const EMAIL_LABEL = 'E-mail';
  const MESSAGE_LABEL = t('cf.message');

  const fields = {
    name: {
      label: NAME_LABEL,
      placeholder: t('cf.your_name'),
      validationMessage: {
        required: t('validation.required', { name: NAME_LABEL }),
        length: t('validation.length', {
          name: NAME_LABEL,
          min: NAME_MIN_LENGTH,
          max: NAME_MAX_LENGTH,
        }),
        pattern: t('validation.only_symbols'),
      },
    },
    [EMAIL_FIELD]: {
      label: EMAIL_LABEL,
      placeholder: t('cf.your_email'),
      validationMessage: {
        required: t('validation.required', { name: EMAIL_LABEL }),
        length: t('validation.length', {
          name: EMAIL_LABEL,
          min: EMAIL_MIN_LENGTH,
          max: EMAIL_MAX_LENGTH,
        }),
        invalid: t('validation.invalid', { name: EMAIL_LABEL }),
      },
    },
    message: {
      label: MESSAGE_LABEL,
      placeholder: t('cf.your_message'),
      validationMessage: {
        required: t('validation.required', { name: MESSAGE_LABEL }),
        length: t('validation.length', {
          name: MESSAGE_LABEL,
          min: MESSAGE_MIN_LENGTH,
          max: MESSAGE_MAX_LENGTH,
        }),
      },
    },
  };

  const getErrorTranslation = (err) => {
    switch (parseInt(err, 10)) {
      case 400:
      case 401:
      case 403:
      case 405:
        return t(`error.err${err}`);
      default:
        return t('error.network');
    }
  };

  const modalContent = {
    error: {
      heading: t('form.error'),
      body: (error) => (
        <React.Fragment>
          <b>{error}</b>
          <p>
            {t('cf.sorry')}
            <br />
            {t('cf.try_later')}
          </p>
        </React.Fragment>
      ),
    },

    loading: {
      heading: t('form.sending'),
      body: (
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>{t('form.pls_wait')}</div>
          <Spinner css={spinnerStyle} />
        </div>
      ),
      action: (closeModal) => (
        <Button onClick={closeModal} primary>
          {t('form.cancel')}
        </Button>
      ),
    },

    success: {
      heading: t('form.success'),
      body: (
        <React.Fragment>
          {' '}
          <p>{t('cf.thanks')}</p>
          <p>{t('cf.we_will_response')}</p>
        </React.Fragment>
      ),
    },
  };

  const [Modal, open, close] = useModal();

  const FormWrap = () => (
    <Modal>
      <ModalHeader>Hello</ModalHeader>
      <ModalBody>
        <ContactFormBase
          fields={fields}
          modalContent={modalContent}
          actionControl={<Button type="submit">{t('form.send_message')}</Button>}
          endPoint={END_POINT}
          getErrorMessage={getErrorTranslation}
        />
      </ModalBody>
      <ModalFooter justify="center">
        <button type="button" onClick={close}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
  return [FormWrap, open];
};

export default useInquiryForm;
