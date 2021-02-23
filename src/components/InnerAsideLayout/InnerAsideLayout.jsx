/** @jsx jsx */
import { jsx } from '@emotion/react';

import Img from 'gatsby-image';

const styleWrap = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  [t.mq.lg]: {
    display: 'grid',
    gridGap: t.space[8],
    gridTemplateColumns: '1fr 3fr',
    gridTemplateRows: 'minmax(100px, 400px) auto',
  },
});

const styleHtmlWrap = (t) => ({
  marginBottom: t.space[8],
  [t.mq.lg]: {
    gridColumn: 2,
    gridRow: '1 / span 2',
    marginBottom: 0,
  },
});

const styleAsideWrap = (t) => ({
  [t.mq.lg]: {
    gridColumn: 1,
    gridRow: 2,
  },
});

const styleImg = (t) => ({
  marginBottom: t.space[8],
  [t.mq.lg]: {
    gridColumn: 1,
    gridRow: 1,
    marginBottom: 0,
  },
});

const InnerAsideLayout = ({ cover, html, children }) => (
  <div css={styleWrap}>
    {cover && cover.sm && (
      <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} css={styleImg} />
    )}
    {html && <div css={styleHtmlWrap} dangerouslySetInnerHTML={{ __html: html }} />}
    <div css={styleAsideWrap}>{children}</div>
  </div>
);

export default InnerAsideLayout;
