/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { space } from '../../../theme/space';

import { styleWrap, styleSubtitle, styleText } from '../../SectionItem/item-default-styles';

const styleTitleRound = {
  marginBottom: space[4],
  textAlign: 'center',
};

const styleImageRound = {
  borderRadius: '50%',
  height: '12.5rem',
  width: '12.5rem',
  marginBottom: space[6],
};

const styleWrapRound = {
  ...styleWrap,
  justifyContent: 'flex-start',
};

const SectionItemRound = ({ data }) => {
  const { title, subtitle, text, image } = data;
  return (
    <div css={styleWrapRound}>
      {image && image.sm && (
        <GatsbyImage
          image={image.sm.childImageSharp.gatsbyImageData}
          alt={image.alt}
          title={image.title}
          css={styleImageRound}
        />
      )}
      <h3 css={styleTitleRound}>{title}</h3>
      {subtitle && <div css={styleSubtitle}>{subtitle}</div>}
      {text && <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
};

export default SectionItemRound;
