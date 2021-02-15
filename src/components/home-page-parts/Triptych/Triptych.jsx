/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import Section from '../../Section';
import { SectionItemR, SectionItemL, SectionItemImage } from '../../SectionItem';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';

const styleWrap = {
  display: 'grid',
  gridGap: space[4],
  [mq.lg]: {
    gridTemplateColumns: '1fr 2fr 1fr',
    gridGap: space[4],
  },
};

const Triptych = ({ title, subtitle, text, items }) => {
  return (
    <Section title={title} subtitle={subtitle} text={text} textLast textAlign="center">
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
export default Triptych;
