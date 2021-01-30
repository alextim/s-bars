/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';

const defStyle = {
  flex: 1,
};

const Col = ({ css = {}, lg, children, ...rest }) => {
  let style = defStyle;
  if (css) {
    style = { ...defStyle, ...css };
  }
  if (lg) {
    style = {
      ...style,
      [mq.lg]: {
        width: `${lg === 4 ? '33.333' : (lg * 100) / 12}%`,
      },
    };
  }
  return (
    <div css={style} {...rest}>
      {children}
    </div>
  );
};

export default Col;
