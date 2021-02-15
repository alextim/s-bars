/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import Icon from '../Icon';

import colors from '../../theme/colors';
import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const styleTitle = {
  marginBottom: space[2],
};

const styleTitleRound = {
  marginTop: space[6],
  marginBottom: space[2],
  textAlign: 'center',
};

const styleSubtitle = {
  marginBottom: space[4],
};

const styleImg = {
  marginBottom: space[2],
};

const styleText = {
  textAlign: 'center',
};

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

const styleWrapL = {
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'right',
    paddingRight: space[4],
    borderRight: `1px ${colors.brand.main} solid`,
  },
};

const styleTextL = {
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'right',
  },
};

export const SectionItemL = ({ data }) => {
  const { title, subtitle, text } = data;
  return (
    <div css={styleWrapL}>
      {title && <h2 css={styleTitle}>{title}</h2>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {text && <div css={styleTextL} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

const styleWrapR = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'left',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: space[4],
    borderLeft: `1px ${colors.brand.main} solid`,
  },
};

const styleTextR = {
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'left',
    marginBottom: space[4],
  },
};

export const SectionItemR = ({ data }) => {
  const { title, subtitle, text } = data;
  return (
    <div css={styleWrapR}>
      {title && <h2 css={styleTitle}>{title}</h2>}
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
const styleImageRound = {
  borderRadius: '50%',
  height: '18rem',
  width: '18rem',
  marginBottom: space[4],
};

const styleWrapRound = {
  ...styleWrap,
  justifyContent: 'flex-start',
};
export const SectionItemRound = ({ data }) => {
  const { title, subtitle, text, image } = data;
  return (
    <div css={styleWrapRound}>
      {image && image.sm && (
        <Img fluid={image.sm.childImageSharp.fluid} alt={image.alt} css={styleImageRound} />
      )}
      <h3 css={styleTitleRound}>{title}</h3>
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

const styleWrapHorizontal = {
  [mq.lg]: {
    display: 'grid',
    gridTemplateColumns: '6.25rem auto',
    gridTemplateRows: '2rem auto',
    gridGap: `0 ${space[5]}`,
  },
};

const styleCircleWrap = {
  float: 'left',
  margin: `0 ${space[5]} ${space[0]} 0`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.brand.main,
  height: '6.25rem',
  width: '6.25rem',
  borderRadius: '50%',
  [mq.lg]: {
    float: 'none',
    margin: 0,
    gridRow: 'span 2',
  },
};

const styleCredoText = {
  /* textAlign: 'justify', */
};

const styleIcon = {
  width: '2.5rem',
  height: '2.5rem',
};

const stylePlane = {
  transform: 'rotate(-45deg)',
};

export const SectionItemCredo = ({ data }) => {
  const { title, text, icon } = data;
  return (
    <div css={styleWrapHorizontal}>
      <div css={styleCircleWrap}>
        <Icon name={icon} css={{ ...styleIcon, ...(icon === 'plane' ? stylePlane : {}) }} />
      </div>
      <h3 css={styleTitle}>{title}</h3>
      <div css={styleCredoText} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default SectionItem;
