import { GatsbyImage } from 'gatsby-plugin-image';

import colors from '@/theme/colors';
import mq from '@/theme/media-queries';
import { space } from '@/theme/space';
import { fontSizes } from '@/theme/font-sizes';
import { styleTitle as defaultStyleTitle, styleImg } from '@/components/SectionItem/item-default-styles';

const styleWrapL = {
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'right',
    paddingRight: space[4],
  },
};

const styleTitleCommon = {
  ...defaultStyleTitle,
  fontSize: fontSizes[5],
};

const styleTextL = {
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'right',
  },
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
  },
};

const styleTextR = {
  textAlign: 'center',
  [mq.lg]: {
    textAlign: 'left',
  },
};

const styleImageWrap = {
  ...styleImg,
  [mq.lg]: {
    padding: `0 ${space[4]}`,
    borderLeft: `1px ${colors.brand.main} solid`,
    borderRight: `1px ${colors.brand.main} solid`,
  },
};

export const SectionItemL = ({ data, breakWords }) => {
  const { title, text } = data;
  const styleTitle = {
    ...styleTitleCommon,
    [mq.lg]: {
      wordSpacing: breakWords ? '100vw' : 'inherit',
      textAlign: 'right',
      fontSize: fontSizes[5],
    },
  };
  return (
    <div css={styleWrapL}>
      {title && <div css={styleTitle}>{title}</div>}
      {text && <div css={styleTextL} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

export const SectionItemR = ({ data, breakWords }) => {
  const { title, text } = data;
  const styleTitle = {
    ...styleTitleCommon,
    fontSize: fontSizes[5],
    [mq.lg]: {
      wordSpacing: breakWords ? '100vw' : 'inherit',
      fontSize: fontSizes[5],
    },
  };
  return (
    <div css={styleWrapR}>
      {title && <div css={styleTitle}>{title}</div>}
      {text && <div css={styleTextR} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

export const SectionItemImage = ({ data }) => {
  const { image } = data;
  return (
    <div css={styleImageWrap}>
      {image && image.sm && <GatsbyImage image={image.sm.childImageSharp.gatsbyImageData} alt={image.alt} title={image.title} />}
    </div>
  );
};
