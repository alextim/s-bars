import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { styleWrap, styleTitle, styleSubtitle, styleImg, styleText } from './item-default-styles';

const SectionItem = ({ data }) => {
  const { title, subtitle, text, image } = data;
  return (
    <div css={styleWrap}>
      {title && <h3 css={styleTitle}>{title}</h3>}
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {image && image.sm && <GatsbyImage css={styleImg} image={getImage(image.sm)} alt={image.alt} title={image.title} />}
      {text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

export default SectionItem;
