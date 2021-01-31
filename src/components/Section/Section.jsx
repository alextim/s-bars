/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import SectionItem from '../SectionItem';
import ItemsGrid from './ItemsGrid';

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

const styleBbodyWrap = (t) => ({
  marginTop: t.space[10],
});

const styleSmall = (t) => ({
  margin: `${t.space[8]} 0`,
});

const styleGgray = (t) => ({
  margin: 0,
  padding: `${t.space[8]} 0`,
  backgroundColor: '#d2d1ce',
});

const Section = ({
  title,
  subtitle,
  text,
  image,
  items,
  type,
  css,
  small = false,
  gray = false,
  children,
}) => {
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
      {type === 'triptych' && items && <ItemsGrid items={items} cols={[3, 6, 3]} />}
      {text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
      {image && image.sm && (
        <Img css={styleImg} fluid={image.sm.childImageSharp.fluid} alt={image.alt} />
      )}
      {children && <div css={styleBbodyWrap}>{children}</div>}
      {!type && items && items.map((item, i) => <SectionItem key={i} data={item} />)}
      {type === '1' && items && <ItemsGrid items={items} />}
    </section>
  );
};

export default Section;
