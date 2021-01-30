/* eslint-disable jsx-a11y/no-static-element-interactions */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import disableScroll from 'disable-scroll';

import {
  styleModalWrapper,
  styleModalOverlay,
  styleModalContent,
  StyledModalCloseButton,
} from './styled';

const ESC_KEY = 27;

let timer;

const Modal = ({ children, isOpen = false, close, elementId = 'portal' }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isOpen]);

  if (isOpen === false) {
    return null;
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === ESC_KEY) {
      e.stopPropagation();
      close();
    } else {
      e.preventDefault();
    }
  };

  return createPortal(
    <div css={styleModalWrapper} ref={ref} tabIndex="-1" onKeyDown={handleKeyDown}>
      <div css={styleModalOverlay} />
      <div css={styleModalContent}>
        {children}
        <StyledModalCloseButton onClick={close} />
      </div>
    </div>,
    document.getElementById(elementId),
  );
};

const useModal = (elementId = 'portal', options = {}) => {
  const { onClose, preventScroll = true } = options;
  const [isOpen, setOpen] = useState(false);

  const closeWithoutTimeout = () => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    if (preventScroll) {
      disableScroll.off();
    }
  };

  const close = (closeTimeoutMS = 0) => {
    if (closeTimeoutMS === 0 || timer) {
      closeWithoutTimeout();
      return;
    }
    timer = setTimeout(closeWithoutTimeout, closeTimeoutMS);
  };

  const open = () => {
    setOpen(true);
    if (preventScroll) {
      disableScroll.on();
    }
  };

  const ModalWrap = ({ children }) => (
    <Modal isOpen={isOpen} close={close} elementId={elementId}>
      {children}
    </Modal>
  );

  return [ModalWrap, open, close, isOpen];
};

export default useModal;
