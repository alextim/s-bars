import React from 'react';
import { ModalHeader, ModalFooter, ModalBody } from '../Modal';
import Message from '../Message';

const ModalContentBase = ({ content, loading, cancel, error }) => {
  if (loading) {
    return (
      <>
        <ModalHeader>{content.loading.heading}</ModalHeader>
        <ModalBody>{content.loading.body}</ModalBody>
        <ModalFooter justify="center">{content.loading.action(cancel)}</ModalFooter>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ModalHeader>{content.error.heading}</ModalHeader>
        <ModalBody>
          <Message variant="error">{content.error.body(error)}</Message>
        </ModalBody>
      </>
    );
  }

  return (
    <>
      <ModalHeader>{content.success.heading}</ModalHeader>
      <ModalBody>
        <Message variant="success">{content.success.body}</Message>
      </ModalBody>
    </>
  );
};

export default ModalContentBase;
