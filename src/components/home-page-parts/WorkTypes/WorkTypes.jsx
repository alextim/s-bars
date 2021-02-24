/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';

import Section from '../../Section';
import { SectionItemRound as SectionItem } from '../../SectionItem';

const styleWrap = {
  marginTop: space[9],
  display: 'grid',
  gridGap: space[10],
  [mq.lg]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const WorkTypes = ({ title, items }) => (
  <Section title={title}>
    <div css={styleWrap}>
      {items && items.map((item, i) => <SectionItem key={i} data={item} />)}
    </div>
  </Section>
);

export default WorkTypes;
