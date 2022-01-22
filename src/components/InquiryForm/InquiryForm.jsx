import React, { useState } from 'react';

import { useTranslation } from '@/i18n';
import sendData from '../Form/src/services/send-data';

import useModal from '../Form/src/components/Modal/useModal';

import ModalContent from './ModalContent';
import Form from './Form';

// const AUTOCLOSE_DELAY = 5000; // in milliseconds
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

const END_POINT = '/.netlify/functions/inquiry';

const InquiryForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getErrorMessage = (err) => {
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

  const onClose = () => {
    if (loading) {
      // clearTimeout(timer);
      setLoading(false);
    }
  };

  const [Modal, openModal, closeModal] = useModal('portal', { onClose });

  const onSubmitForm = async (data) => {
    const values = { ...data };
    delete values.privacy;
    values.subject = values.other;
    delete values.other;

    setError('');
    setLoading(true);
    try {
      openModal();
      // await sendDataMock();
      return await sendData(values, END_POINT);
    } catch (err) {
      // clearTimeout(timer);
      setError(getErrorMessage(err.message));
      return false;
    } finally {
      setLoading(false);
      /* leave modal open */
      /**
       * closeModal(0);               // close immidiatly
       * closeModal(AUTOCLOSE_DELAY); // auto close with delay
       */
    }
  };

  return (
    <React.Fragment>
      <Modal>
        <ModalContent loading={loading} cancel={closeModal} error={error} />
      </Modal>
      <Form onSubmit={onSubmitForm} />
    </React.Fragment>
  );
};

export default InquiryForm;
