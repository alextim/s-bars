/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import { useTranslation } from '../../i18n';

import { ModalHeader, ModalFooter, ModalBody } from '../Form/src/components/Modal';
import Message from '../Form/src/components/Message';
import Spinner from '../Spinner';
import Button from '../Button';

const spinnerStyle = (t) => ({ display: 'block', marginTop: t.space[8] });

const ModalContent = ({ loading, cancel, error }) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <React.Fragment>
        <ModalHeader>{t('form.error')}</ModalHeader>
        <ModalBody>
          <Message variant="error">
            <p>
              <b>{error}</b>
            </p>
            <p>{t('if.sorry')}</p>
            <div>{t('if.try_later')}</div>
          </Message>
        </ModalBody>
        <ModalFooter justify="center">
          <Button onClick={cancel}>{t('form.close')}</Button>
        </ModalFooter>
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
        <Message variant="success">
          {' '}
          <p>{t('if.thanks')}</p>
          <div>{t('if.we_will_response')}</div>
        </Message>
      </ModalBody>
      <ModalFooter justify="center">
        <Button onClick={cancel}>{t('form.close')}</Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default ModalContent;
