import Section from '@/components/Section';
import mq from '@/theme/media-queries';
import { space } from '@/theme/space';

import SectionItem from './SectionItemCredo';

const styleWrap = {
  display: 'grid',
  gridGap: space[10],

  [mq.lg]: {
    gridTemplateColumns: '1fr 1fr',
  },
};

const Credo = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle} text={text} textAlign="center">
    <div css={styleWrap}>{items && items.map((item, i) => <SectionItem key={i} data={item} />)}</div>
  </Section>
);

export default Credo;
