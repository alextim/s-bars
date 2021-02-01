/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';

const defStyle = {
  flex: 1,
  [mq.lg]: {
    paddingRight: '1rem',
    ':last-of-type': {
      paddingRight: 0,
    },
  },
};

const Col = ({ css = {}, lg, children, ...rest }) => {
  let style = defStyle;
  if (css) {
    style = [defStyle, css];
  }
  if (lg) {
    style = [
      ...style,
      {
        [mq.lg]: {
          maxWidth: `calc(100% / 12 * ${lg})`,
        },
      },
    ];
  }
  return (
    <div css={style} {...rest}>
      {children}
    </div>
  );
};

export default Col;
