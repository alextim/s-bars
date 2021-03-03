/** @jsx jsx */
import { jsx } from '@emotion/react';

import { GatsbyImage } from 'gatsby-plugin-image';

const styleWrap = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  [t.mq.lg]: {
    display: 'grid',
    gridGap: t.space[8],
    grid: 'auto 1fr/1fr 3fr',
  },
});

const styleImg = (t) => ({
  marginBottom: t.space[8],
  [t.mq.lg]: {
    marginBottom: 0,
  },
});

const styleHtmlWrap = (t) => ({
  marginBottom: t.space[8],
  [t.mq.lg]: {
    gridColumn: 2,
    gridRow: 'auto/span 2',
    marginBottom: 0,
  },
});

const styleAsideWrap = (t) => ({
  [t.mq.lg]: {
    gridColumn: 1,
  },
});

const InnerAsideLayout = ({ cover, html, children }) => (
  <div css={styleWrap}>
    {cover && cover.sm && (
      <GatsbyImage
        image={cover.sm.childImageSharp.gatsbyImageData}
        alt={cover.alt}
        css={styleImg}
      />
    )}
    {html && <div css={styleHtmlWrap} dangerouslySetInnerHTML={{ __html: html }} />}
    <div css={styleAsideWrap}>{children}</div>
  </div>
);

export default InnerAsideLayout;
