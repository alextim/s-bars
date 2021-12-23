/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';

import Section from '../../Section';
import SectionItem from './SectionItemRound';

const styleWrap = {
  marginTop: space[9],
  display: 'grid',
  gridGap: space[10],
  [mq.lg]: {
    gridTemplateColumns: '1fr 1fr',
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
