/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import { useTranslation } from '../../i18n';

import { ModalHeader, ModalFooter, ModalBody } from '../Form/src/components/Modal';
import Message from '../Form/src/components/Message';
import Spinner from '../Spinner';
import Button from '../Button';

const spinnerStyle = (t) => ({ display: 'block', marginTop: t.space[7] });

const ModalContent = ({ loading, cancel, error }) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <React.Fragment>
        <ModalHeader>{t('form.error')}</ModalHeader>
        <ModalBody>
          <Message type="error">
            <b>{error}</b>
            <p>{t('if.sorry')}</p>
            <p>{t('if.try_later')}</p>
          </Message>
        </ModalBody>
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <React.Fragment>
        <ModalHeader>{t('form.sending')}</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter justify="center">
          <Button onClick={cancel}>{t('form.cancel')}</Button>
        </ModalFooter>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ModalHeader>{t('form.success')}</ModalHeader>
      <ModalBody>
        <Message type="success">
          {' '}
          <p>{t('if.thanks')}</p>
          <p>{t('if.we_will_response')}</p>
        </Message>
      </ModalBody>
    </React.Fragment>
  );
};

export default ModalContent;
