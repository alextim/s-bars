const lrStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  top: 0,
};

const lStyle = {
  ...lrStyle,
  justifyContent: 'center',
  backgroundColor: 'inherit',
};

const rStyle = {
  ...lrStyle,
  margin: '0 0 0 auto',
};

export const Left = ({ children }) => <div css={lStyle}>{children}</div>;
export const Right = ({ children }) => <div css={rStyle}>{children}</div>;
