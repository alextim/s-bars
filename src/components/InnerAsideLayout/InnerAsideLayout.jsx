/** @jsx jsx */
import { jsx } from '@emotion/react';

import { GatsbyImage } from 'gatsby-plugin-image';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
  [mq.lg]: {
    display: 'grid',
    // gridColumnGap: 0,
    gridRowGap: space[7],
    grid: 'auto 1fr/1fr 3fr',
  },
};

const styleImage = {
  marginBottom: space[8],
  [mq.lg]: {
    gridColumn: 1,
    gridRow: 1,
    marginBottom: 0,
    paddingRight: space[4],
  },
};

const styleBody = {
  marginBottom: space[8],
  [mq.lg]: {
    gridColumn: 2,
    gridRow: '1/span 2',
    marginBottom: 0,
    paddingLeft: space[4],
  },
};

const styleHtml = {
  marginBottom: space[8],
};

const styleAside = {
  [mq.lg]: {
    gridColumn: 1,
    gridRow: 2,
    paddingRight: space[4],
  },
};

const InnerAsideLayout = ({ cover, html, children, aside }) => (
  <div css={styleWrap}>
    <div css={styleImage}>
      {cover && cover.sm && (
        <GatsbyImage
          image={cover.sm.childImageSharp.gatsbyImageData}
          alt={cover.alt}
          title={cover.title}
        />
      )}
    </div>
    <div css={styleBody}>
      {html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}
      {children}
    </div>
    <div css={styleAside}>{aside}</div>
  </div>
);

export default InnerAsideLayout;
