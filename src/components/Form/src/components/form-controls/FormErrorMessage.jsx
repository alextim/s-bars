/** @jsx jsx */
import { jsx } from '@emotion/react';

const styleError = (t) => ({
  color: t.colors.error,
});

const FormErrorMessage = ({ children }) =>
  children ? <div css={styleError}>{children}</div> : null;

export default FormErrorMessage;
