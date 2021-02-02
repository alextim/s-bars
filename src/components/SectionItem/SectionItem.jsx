/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

const styleWrap = () => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  /* marginTop: t.space[10], */
});
const styleTitle = (t) => ({
  marginBottom: t.space[2],
});

const styleTitleRound = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[2],
});

const styleSubtitle = (t) => ({
  marginBottom: t.space[4],
});

const styleImg = (t) => ({
  marginBottom: t.space[2],
});

const styleText = {
  textAlign: 'justify',
};

const SectionItem = ({ data }) => {
  const { title, subtitle, text, image } = data;
  // eslint-disable-next-line no-console
  console.log(image);
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

const styleWrapL = (t) => ({
  textAlign: 'center',
  [t.mq.lg]: {
    textAlign: 'right',
  },
});

const styleTextL = (t) => ({
  textAlign: 'center',
  [t.mq.lg]: {
    textAlign: 'right',
  },
});

export const SectionItemL = ({ data }) => {
  const { title, subtitle, text } = data;
  return (
    <div css={styleWrapL}>
      {title && <h3 css={styleTitle}>{title}</h3>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {text && <div css={styleTextL} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

const styleWrapR = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  [t.mq.lg]: {
    textAlign: 'left',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

const styleTextR = (t) => ({
  textAlign: 'center',
  [t.mq.lg]: {
    textAlign: 'left',
    marginBottom: t.space[4],
  },
});

export const SectionItemR = ({ data }) => {
  const { title, subtitle, text } = data;
  return (
    <div css={styleWrapR}>
      {title && <h3 css={styleTitle}>{title}</h3>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {text && <div css={styleTextR} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

export const SectionItemImage = ({ data }) => {
  const { image } = data;
  return (
    image &&
    image.sm && <Img css={styleImg} fluid={image.sm.childImageSharp.fluid} alt={image.alt} />
  );
};
const styleImageRound = (t) => ({
  borderRadius: '50%',
  height: '18rem',
  width: '18rem',
  marginBottom: t.space[2],
});

export const SectionItemRound = ({ data }) => {
  const { title, subtitle, text, image } = data;
  return (
    <div css={styleWrap}>
      {image && image.sm && (
        <Img fluid={image.sm.childImageSharp.fluid} alt={image.alt} css={styleImageRound} />
      )}
      <h3 css={styleTitleRound}>{title}</h3>
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

const styleWrapHorizontal = (t) => ({
  [t.mq.lg]: {
    display: 'grid',
    gridTemplateColumns: '100px auto',
    gridTemplateRows: '2rem auto',
    gridGap: `0 ${t.space[5]}`,
  },
});

const styleCircleWrap = (t) => ({
  float: 'left',
  margin: `0 ${t.space[5]} ${t.space[0]} 0`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: t.colors.brand.secondLight,
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  [t.mq.lg]: {
    float: 'none',
    margin: 0,
    gridRow: 'span 2',
  },
});
const styleCredoText = {
  textAlign: 'justify',
};
export const SectionItemCredo = ({ data }) => {
  const { title, text, image } = data;
  return (
    <div css={styleWrapHorizontal}>
      <div css={styleCircleWrap}>
        {image && image.sm && image.sm.extension === 'svg' && (
          <img src={image.sm.publicURL} alt={image.alt} />
        )}
      </div>
      <h3 css={styleTitle}>{title}</h3>
      <div css={styleCredoText} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default SectionItem;
