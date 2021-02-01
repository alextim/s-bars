/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

const styleWrap = (t) => ({
  marginTop: t.space[10],
});
const styleTitle = {
  marginTop: '2rem',
  textAlign: 'center',
};

const styleSubtitle = (t) => ({
  marginTop: t.space[2],
  textAlign: 'center',
});

const styleText = (t) => ({
  marginTop: t.space[7],
  textAlign: 'justify',
});

const styleImg = (t) => ({
  marginTop: t.space[2],
});

const styleSmall = (t) => ({
  margin: `${t.space[8]} 0`,
});

const styleGgray = (t) => ({
  margin: 0,
  padding: `${t.space[8]} 0`,
  backgroundColor: '#d2d1ce',
});

const styleBbodyWrap = (t) => ({
  marginTop: t.space[10],
});

const SectionBase = ({ title, subtitle, text, image, css, small, gray, textLast, children }) => {
  const styles = [styleWrap];
  if (small) {
    styles.push(styleSmall);
  }
  if (gray) {
    styles.push(styleGgray);
  }
  if (css) {
    styles.push(css);
  }

  return (
    <section css={styles}>
      {title && <h2 css={styleTitle}>{title}</h2>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {image && image.sm && (
        <Img css={styleImg} fluid={image.sm.childImageSharp.fluid} alt={image.alt} />
      )}
      {!textLast && text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
      {children && <div css={styleBbodyWrap}>{children}</div>}
      {textLast && text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </section>
  );
};

export default SectionBase;
