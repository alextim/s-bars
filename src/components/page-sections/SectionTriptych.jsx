/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import Section from '../Section';
import { SectionItemR, SectionItemL, SectionItemImage } from '../SectionItem';

const styleWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[8],
  [t.mq.lg]: {
    gridTemplateColumns: '1fr 2fr 1fr',
  },
});

const SectionTriptych = ({ title, subtitle, text, items }) => {
  return (
    <Section title={title} subtitle={subtitle} text={text} textLast>
      <div css={styleWrap}>
        {items && items.length > 2 && (
          <React.Fragment>
            <SectionItemL data={items[0]} />
            <SectionItemImage data={items[1]} />
            <SectionItemR data={items[2]} />
          </React.Fragment>
        )}
      </div>
    </Section>
  );
};
export default SectionTriptych;
