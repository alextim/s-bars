/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import FaCheck from '../../assets/fa/solid/check.svg';
import Section from '../Section';

const ncols = 3;

const styleWrap = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  [t.mq.lg]: {
    display: 'grid',
    gridTemplateColumns: `repeat(${ncols}, 1fr)`,
    gridTemplateRows: 'repeat(auto-fill, 5rem)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const border = '1px black solid';

const getCellStyle = (i, n) => {
  const nrows = Math.ceil(n / ncols);
  const row = Math.floor(i / ncols);

  const isLastCol = !(i - row * (ncols - 1) + 1);
  const isLastRow = !((i + 1) % nrows);
  const isLast = isLastCol && isLastCol;

  return (t) => ({
    marginBottom: t.space[2],
    [t.mq.lg]: {
      marginBottom: 0,
      padding: '1rem',
      borderBottom: isLast || isLastRow ? 0 : border,
      borderRight: isLast || isLastCol ? 0 : border,
    },
  });
};

const styleIcon = (t) => ({
  marginRight: t.space[2],
  [t.mq.lg]: {
    display: 'none',
  },
});
const SectionObjectLinks = ({ title, subtitle, text, items }) => {
  const n = items.length;
  return (
    <Section title={title} subtitle={subtitle} text={text} textLast>
      <div css={styleWrap}>
        {items.map(({ title: itemTitle, to }, i) => (
          <div key={i} css={getCellStyle(i, n)}>
            <FaCheck css={styleIcon} />
            <a href={to}>{itemTitle}</a>
          </div>
        ))}
      </div>
    </Section>
  );
};
export default SectionObjectLinks;
