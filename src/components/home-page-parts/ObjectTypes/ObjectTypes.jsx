/** @jsx jsx */
import { jsx } from '@emotion/react';

import colors from '../../../theme/colors';
import links from '../../../theme/links';
import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';
import { fontSizes } from '../../../theme/font-sizes';

import FaCheck from '../../../assets/fa/solid/check.svg';
import Section from '../../Section';

const ncols = 3;

const styleWrap = {
  display: 'grid',
  gridGap: space[6],
  justifyContent: 'start',
  [mq.lg]: {
    gridTemplateColumns: `repeat(${ncols}, 1fr)`,
    gridGap: '1px',
    backgroundColor: colors.brand.main,
  },
};

const styleCell = {
  display: 'inline-flex',
  alignItems: 'center',
  [mq.lg]: {
    padding: '1.5rem',
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    backgroundColor: colors.background,
  },
};

const styleIcon = {
  marginRight: space[2],
  width: '1rem',
  height: '1rem',
  color: links.color,
  [mq.lg]: {
    display: 'none',
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

const styleLink = {
  [mq.lg]: {
    color: 'rgb(156, 0, 26)',
    letterSpacing: '1px',
  },
};

const ObjectTypes = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle}>
    <div css={styleWrap}>
      {items.map(({ title: itemTitle, to }, i) => (
        <div key={i} css={styleCell}>
          <FaCheck css={styleIcon} />
          <a css={styleLink} href={to}>
            {itemTitle}
          </a>
        </div>
      ))}
    </div>
    <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />
  </Section>
);

export default ObjectTypes;
