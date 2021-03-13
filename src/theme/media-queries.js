// eslint-disable-next-line import/no-extraneous-dependencies
import preval from 'preval.macro';

const o = preval`
  const b = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl:'1920px',
  };
  const bp = Object.keys(b).map((key) => b[key]);

  const mq = {};

  Object.keys(b).forEach((key) => {
    mq[key] = '@media (min-width: ' + b[key] + ')';
  });

  module.exports = { b, bp, mq };
`;

export const breakpoints = o.b;
export const breakpointsArray = o.bp;

const { mq } = o;

export default mq;
