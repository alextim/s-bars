/** @jsx jsx */
import { jsx } from '@emotion/react';

import Section from '../Section';
import { SectionItemRound as SectionItem } from '../SectionItem';

const styleWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[10],
  [t.mq.lg]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const SectionRecommended = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle} text={text} textLast>
    <div css={styleWrap}>
      {items && items.map((item, i) => <SectionItem key={i} data={item} />)}
    </div>
  </Section>
);

export default SectionRecommended;
