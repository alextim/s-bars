/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

const styleWrap = (t) => ({
  marginTop: t.space[10],
});
const styleTitle = {
  // marginTop: '2rem',
  textAlign: 'center',
};

const styleSubtitle = (t) => ({
  marginTop: t.space[2],
  textAlign: 'center',
});

const styleImg = (t) => ({
  marginTop: t.space[2],
});

const styleText = (t) => ({
  marginTop: t.space[5],
  textAlign: 'justify',
});

const SectionItem = ({ data }) => {
  const { title, subtitle, text, image } = data;
  return (
    <div css={styleWrap}>
      {title && <h3 css={styleTitle}>{title}</h3>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {image && image.sm && (
        <Img css={styleImg} fluid={image.sm.childImageSharp.fluid} alt={image.alt} />
      )}
      {text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

export default SectionItem;
