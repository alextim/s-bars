/** @jsx jsx */
import { jsx } from '@emotion/react';

import Section from '../../Section';
import SectionItem from './SectionItemCredo';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';

const styleWrap = {
  display: 'grid',
  gridGap: space[10],
  [mq.lg]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const Credo = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle} text={text} textAlign="center">
    <div css={styleWrap}>
      {items && items.map((item, i) => <SectionItem key={i} data={item} />)}
    </div>
  </Section>
);

export default Credo;
