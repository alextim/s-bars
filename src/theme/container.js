import mq from './media-queries';

const hero = {
  minWidth: '320px',
  maxWidth: '1280px',
  margin: '0 auto',
};

const header = {
  ...hero,
  padding: '0 1rem',
  [mq.lg]: {
    padding: '0 2rem',
  },
};

const main = {
  ...header,
};

const container = {
  hero,
  header,
  main,
};

export default container;
