/** @jsx jsx */
import { jsx } from '@emotion/react';

const getStyle = (t, isInvalid) => ({
  display: 'flex',
  flexDirection: 'column',
  '> input, > textarea': {
    borderColor: isInvalid ? t.colors.error : t.colors.body,
  },
});

const FormControl = ({ children, isInvalid }) => (
  <div css={(t) => getStyle(t, isInvalid)}>{children}</div>
);

export default FormControl;
