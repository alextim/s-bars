/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import { space } from '../../theme/space';

const styleWrap = {
  marginBottom: space[10],
  ':last-of-type': {
    marginBottom: 0,
  },
};
const styleTitle = {
  textAlign: 'center',
};

const styleSubtitle = {
  marginTop: space[2],
  textAlign: 'center',
};

const styleText = {
  marginTop: space[7],
  textAlign: 'justify',
};

const styleImg = {
  marginTop: space[2],
};

const styleSmall = {
  margin: `${space[8]} 0`,
};

const styleGgray = {
  margin: 0,
  padding: `${space[8]} 0`,
  backgroundColor: '#d2d1ce',
};

const styleBbodyWrap = {
  marginTop: space[10],
};

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
