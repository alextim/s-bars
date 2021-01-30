import { breakpoints } from './breakpoints';

const mq = {};
Object.keys(breakpoints).forEach((bp) => {
  mq[bp] = `@media (min-width: ${breakpoints[bp]})`;
});

export default mq;
