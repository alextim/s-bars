import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import mq from '@/theme/media-queries';
import { space } from '@/theme/space';
import { fontSizes } from '@/theme/font-sizes';
import fontWeights from '@/theme/font-weights';
import fonts from '@/theme/fonts';

const styleWrap = {
  marginBottom: space[10],
  ':last-of-type': {
    marginBottom: 0,
  },
};
const styleTitle = {
  fontSize: fontSizes[6],
  marginBottom: space[4],
  fontFamily: fonts.heading,
  fontWeight: fontWeights.heading,
  textAlign: 'center',
  [mq.lg]: {
    fontSize: fontSizes[6],
  },
};

const styleSubtitle = {
  marginTop: space[2],
  textAlign: 'center',
};

const styleTextDefault = {
  marginTop: space[7],
};

const styleImg = {
  marginTop: space[2],
};

const styleBodyWrap = {
  marginTop: space[4],
};

const Section = ({ title, subtitle, text, image, textLast, textAlign = 'match-parent', children }) => {
  const styleText = {
    ...styleTextDefault,
    textAlign,
  };

  return (
    <section css={styleWrap}>
      {title && <h2 css={styleTitle}>{title}</h2>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {image && image.sm && <GatsbyImage css={styleImg} image={getImage(image.sm)} alt={image.alt} title={image.title} />}
      {!textLast && text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
      <div css={styleBodyWrap}>{children}</div>
      {textLast && text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </section>
  );
};

export default Section;
