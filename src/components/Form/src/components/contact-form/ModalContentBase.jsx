import React from 'react';
import { ModalHeader, ModalFooter, ModalBody } from '../Modal';
import Message from '../Message';

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
          <Message variant="error">{content.error.body(error)}</Message>
        </ModalBody>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ModalHeader>{content.success.heading}</ModalHeader>
      <ModalBody>
        <Message variant="success">{content.success.body}</Message>
      </ModalBody>
    </React.Fragment>
  );
};

export default ModalContentBase;
