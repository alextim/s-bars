import React from 'react';
import { ModalHeader, ModalFooter, ModalBody } from '../Modal';
import { MessageSuccess, MessageError } from '../messages';

const ModalContentBase = ({ content, loading, cancel, error }) => {
  if (loading) {
    return (
      <React.Fragment>
        <ModalHeader>{content.loading.heading}</ModalHeader>
        <ModalBody>{content.loading.body}</ModalBody>
        <ModalFooter justify="center">{content.loading.action(cancel)}</ModalFooter>
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <React.Fragment>
        <ModalHeader>{content.error.heading}</ModalHeader>
        <ModalBody>
          <MessageError>{content.error.body(error)}</MessageError>
        </ModalBody>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ModalHeader>{content.success.heading}</ModalHeader>
      <ModalBody>
        <MessageSuccess>{content.success.body}</MessageSuccess>
      </ModalBody>
    </React.Fragment>
  );
};

export default ModalContentBase;
