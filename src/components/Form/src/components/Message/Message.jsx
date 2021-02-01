/** @jsx jsx */
import { jsx } from '@emotion/react';

import Icon from '../../../../Icon';

const iconStyle = {
  marginRight: '1rem',
  width: '3rem',
  height: '3rem',
};

const wrapperStyle = {
  display: 'flex',
};

const Message = ({ type, children }) => {
  let icon = null;
  switch (type) {
    case 'error':
      icon = <Icon name="exclamationTriangle" css={{ ...iconStyle, color: 'red' }} />;
      break;
    case 'success':
      icon = <Icon name="checkCircle" css={{ ...iconStyle, color: 'green' }} />;
      break;
    default:
      break;
  }

  return (
    <div css={wrapperStyle}>
      {icon}
      <div>{children}</div>
    </div>
  );
};

export default Message;
