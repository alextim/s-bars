/** @jsx jsx */
import { jsx } from '@emotion/react';

import FaCheck from '../../assets/fa/solid/check.svg';
import Section from '../Section';

const ncols = 3;

const styleWrap = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  [t.mq.lg]: {
    display: 'grid',
    gridTemplateColumns: `repeat(${ncols}, 1fr)`,
    gridGap: '1px',
    backgroundColor: t.colors.brand.main,
  },
});

const styleCell = (t) => ({
  display: 'inline-flex',
  marginBottom: t.space[6],
  alignItems: 'center',
  [t.mq.lg]: {
    padding: '1.5rem',
    marginBottom: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: t.colors.background,
  },
});

const styleIcon = (t) => ({
  marginRight: t.space[2],
  width: '1rem',
  height: '1rem',
  [t.mq.lg]: {
    display: 'none',
  },
});

const SectionObjectLinks = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle} text={text} textLast>
    <div css={styleWrap}>
      {items.map(({ title: itemTitle, to }, i) => (
        <div key={i} css={styleCell}>
          <FaCheck css={styleIcon} />
          <a href={to}>{itemTitle}</a>
        </div>
      ))}
    </div>
  </Section>
);

export default SectionObjectLinks;
