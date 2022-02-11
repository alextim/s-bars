import React from 'react';

import { useTranslation } from '@/i18n';
import { space } from '@/theme/space';

import { ModalHeader, ModalFooter, ModalBody } from '@/components/Form/src/components/Modal';
import { MessageSuccess, MessageError } from '@/components/Form/src/components/messages';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';

const styleSpinner = {
  display: 'block',
  marginTop: space[8],
};

const ModalContent = ({ loading, cancel, error }) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <React.Fragment>
        <ModalHeader>{t('form.error')}</ModalHeader>
        <ModalBody>
          <MessageError>
            <p>
              <b>{error}</b>
            </p>
            <p>{t('if.sorry')}</p>
            <div>{t('if.try_later')}</div>
          </MessageError>
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
            <Spinner css={styleSpinner} />
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
        <MessageSuccess>
          {' '}
          <p>{t('if.thanks')}</p>
          <div>{t('if.we_will_response')}</div>
        </MessageSuccess>
      </ModalBody>
      <ModalFooter justify="center">
        <Button onClick={cancel}>{t('form.close')}</Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default ModalContent;
