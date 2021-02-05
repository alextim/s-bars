/** @jsx jsx */
import { jsx } from '@emotion/react';

import Icon from '../../../../Icon';

const styleIconCommon = {
  marginRight: '1rem',
  width: '3rem',
  height: '3rem',
};

const styleExclamationIcon = {
  ...styleIconCommon,
  color: 'red',
};
const styleCheckIcon = {
  ...styleIconCommon,
  color: 'green',
};
const styleWtap = {
  display: 'flex',
};

const Message = ({ type, children }) => {
  let icon = null;
  switch (type) {
    case 'error':
      icon = <Icon name="exclamationTriangle" css={styleExclamationIcon} />;
      break;
    case 'success':
      icon = <Icon name="checkCircle" css={styleCheckIcon} />;
      break;
    default:
      break;
  }

  return (
    <div css={styleWtap}>
      {icon}
      <div>{children}</div>
    </div>
  );
};

export default Message;
