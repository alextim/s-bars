import preval from 'preval.macro';

const s = preval`
  const b = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl:'1920px',
  };
  const bp = Object.keys(b).map((key) => b[key]);
  module.exports = { b, bp };
`;

export const breakpoints = s.b;
export const breakpointsArray = s.bp;
