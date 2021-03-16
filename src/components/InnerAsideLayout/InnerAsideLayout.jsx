/** @jsx jsx */
import { jsx } from '@emotion/react';

import { GatsbyImage } from 'gatsby-plugin-image';

const styleWrap = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  [t.mq.lg]: {
    display: 'grid',
    gridGap: `${t.space[7]} 0`,
    grid: 'auto 1fr/1fr 3fr',
  },
});

const styleImage = (t) => ({
  marginBottom: t.space[8],
  [t.mq.lg]: {
    marginBottom: 0,
    paddingRight: t.space[4],
  },
});

const styleBody = (t) => ({
  marginBottom: t.space[8],
  [t.mq.lg]: {
    gridColumn: 2,
    gridRow: 'auto/span 2',
    marginBottom: 0,
    paddingLeft: t.space[4],
  },
});

const styleHtml = (t) => ({
  marginBottom: t.space[8],
});

const styleAside = (t) => ({
  [t.mq.lg]: {
    gridColumn: 1,
    paddingRight: t.space[4],
  },
});

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
