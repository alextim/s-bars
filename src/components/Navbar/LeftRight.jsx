const common = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  top: 0,
};

const styleL = {
  ...common,
  justifyContent: 'center',
  backgroundColor: 'inherit',
};

const styleR = {
  ...common,
  margin: '0 0 0 auto',
};

export const Left = ({ children }) => <div css={styleL}>{children}</div>;
export const Right = ({ children }) => <div css={styleR}>{children}</div>;
