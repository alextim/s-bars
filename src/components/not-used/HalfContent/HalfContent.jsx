/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { GatsbyImage } from 'gatsby-plugin-image';

import mq from '../../../theme/media-queries';

const styleWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
};

const styleWrapperLeft = {
  [mq.lg]: {
    flexDirection: 'row-reverse',
  },
};

const styleContentWrapper = {
  width: '100%',
  [mq.lg]: {
    width: '50%',
  },
};

const styleText = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  textAlign: 'left',
  padding: '2rem 0',
  [mq.lg]: {
    width: '50%',
    padding: '0 3rem',
  },
};
const styleTextFullWidth = {
  padding: '1rem',
  [mq.lg]: {
    padding: '2rem',
  },
};

const styleLeft = {
  [mq.lg]: {
    width: '50%',
    padding: '0 3rem',
    textAlign: 'right',
  },
};

const headingStyle = (t) => ({
  marginBottom: t.space[2],
});
const HalfContent = ({ items, fullwidth = false, left = false }) =>
  items.map(({ component, title, text, image }, i) => (
    <HalfContentItem
      key={i}
      component={component}
      title={title}
      text={text}
      image={image}
      fullwidth={fullwidth}
      left={i % 2 ? !left : left}
    />
  ));

const HalfContentItem = ({ component, title, text, image, fullwidth, left }) => {
  const textContent = component || (
    <React.Fragment>
      {title && <h4 css={headingStyle}>{title}</h4>}
      {text && <div>{text}</div>}
    </React.Fragment>
  );
  const imgContent =
    image && image.src ? (
      <GatsbyImage
        image={image.src.childImageSharp.gatsbyImageData}
        alt={image.alt}
        title={image.alt}
      />
    ) : null;

  const textStyle = {
    ...styleText,
    ...(fullwidth ? styleTextFullWidth : {}),
  };

  if (left) {
    return (
      <div css={{ ...styleWrapper, ...styleWrapperLeft }}>
        <div css={styleContentWrapper}>{imgContent}</div>
        <div css={{ ...styleContentWrapper, ...textStyle, ...styleLeft }}>{textContent}</div>
      </div>
    );
  }

  return (
    <div css={styleWrapper}>
      <div css={styleContentWrapper}>{imgContent}</div>
      <div css={{ ...styleContentWrapper, ...textStyle }}>{textContent}</div>
    </div>
  );
};

export default HalfContent;
