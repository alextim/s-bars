/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';

const style = {
  display: 'flex',
  flexDirection: 'column',
  [mq.lg]: {
    flexDirection: 'row',
  },
};

const Row = ({ css = {}, children, ...rest }) => (
  <div css={[style, css]} {...rest}>
    {children}
  </div>
);

export default Row;
