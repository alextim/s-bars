/** @jsx jsx */
import { jsx } from '@emotion/react';

import FaCheck from '../../assets/fa/solid/check.svg';
import Section from '../Section';

const ncols = 3;

const styleWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[6],
  justifyContent: 'start',
  [t.mq.lg]: {
    gridTemplateColumns: `repeat(${ncols}, 1fr)`,
    gridGap: '1px',
    backgroundColor: t.colors.brand.main,
  },
});

const styleCell = (t) => ({
  display: 'inline-flex',
  alignItems: 'center',
  [t.mq.lg]: {
    padding: '1.5rem',
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    backgroundColor: t.colors.background,
  },
});

const styleIcon = (t) => ({
  marginRight: t.space[2],
  width: '1rem',
  height: '1rem',
  color: t.links.color,
  [t.mq.lg]: {
    display: 'none',
  },
});

const styleText = (t) => ({
  textAlign: 'center',
  marginTop: t.space[7],
  [t.mq.lg]: {
    textTransform: 'uppercase',
  },
});

const SectionObjectTypes = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle}>
    <div css={styleWrap}>
      {items.map(({ title: itemTitle, to }, i) => (
        <div key={i} css={styleCell}>
          <FaCheck css={styleIcon} />
          <a href={to}>{itemTitle}</a>
        </div>
      ))}
    </div>
    <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />
  </Section>
);

export default SectionObjectTypes;
