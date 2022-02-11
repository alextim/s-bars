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

export const MessageError = ({ children }) => (
  <div css={styleWtap}>
    <Icon name="exclamationTriangle" css={styleExclamationIcon} />
    <div>{children}</div>
  </div>
);

export const MessageSuccess = ({ children }) => (
  <div css={styleWtap}>
    <Icon name="checkCircle" css={styleCheckIcon} />
    <div>{children}</div>
  </div>
);
