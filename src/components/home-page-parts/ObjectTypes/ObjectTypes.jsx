/** @jsx jsx */
import { jsx } from '@emotion/react';

import ObjectTypeItem from './ObjectTypeItem';
import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';
import { fontSizes } from '../../../theme/font-sizes';

import Section from '../../Section';

const ncols = 3;

const styleWrap = {
  display: 'grid',
  gridGap: space[6],
  justifyContent: 'start',
  [mq.lg]: {
    gridTemplateColumns: `repeat(${ncols}, 1fr)`,
    gridGap: 0,
  },
};

const styleText = {
  textAlign: 'center',
  marginTop: space[7],
  [mq.lg]: {
    textTransform: 'uppercase',
    fontSize: fontSizes[3],
  },
};

// const firstRow = i < ncols;
// const lastRow = i >= n - ncols;
// const firstCol = i % ncols === 0;
// const lastCol = (i + 1) % ncols === 0;
const ObjectTypes = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle}>
    <div css={styleWrap}>
      {items.map(({ title: itemTitle, to }, i) => (
        <ObjectTypeItem
          key={i}
          title={itemTitle}
          to={to}
          firstRow={i < ncols}
          firstCol={i % ncols === 0}
        />
      ))}
    </div>
    <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />
  </Section>
);

export default ObjectTypes;
