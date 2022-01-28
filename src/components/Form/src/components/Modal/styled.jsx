import colors from '@/theme/colors';
import shadows from '@/theme/shadows';

export const styleModalWrap = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

export const styleModalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const styleCloseButtonWrap = {
  position: 'absolute',
  right: '0.5rem',
  top: '1rem',
};

const styleCloseButton = {
  position: 'relative',
  width: '1.5rem',
  height: '1.75rem',
  opacity: 0.3,
  border: 0,
  backgroundColor: 'transparent',

  '&:hover': {
    opacity: '1',
  },

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '1rem',
    height: '1.5rem',
    width: '2px',
    backgroundColor: colors.modal.text,
  },

  '&::before': {
    transform: 'rotate(45deg)',
  },

  '&::after': {
    transform: 'rotate(-45deg)',
  },
};

export const StyledModalCloseButton = ({ onClick }) => (
  <div css={styleCloseButtonWrap}>
    <button
      css={styleCloseButton}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    />
  </div>
);

export const styleModalContent = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '26rem',
  top: 0,
  margin: '3.75rem auto',
  color: colors.modal.text,
  backgroundColor: colors.modal.bg,
  boxShadow: shadows.dialog,
  outline: 0,
  zIndex: 1400,
};

export const ModalHeader = ({ children }) => (
  <div
    css={{
      position: 'relative',
      padding: '1rem 1.5rem',
      fontSize: '1.25rem',
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

export const ModalBody = ({ children }) => (
  <div
    css={{
      position: 'relative',
      padding: '0.5rem 1.5rem 1.5rem',
      flex: '1 1 0%',
    }}
  >
    {children}
  </div>
);

export const ModalFooter = ({ justify, children }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: justify || 'flex-end',
      padding: '1rem 1.5rem',
    }}
  >
    {children}
  </div>
);
