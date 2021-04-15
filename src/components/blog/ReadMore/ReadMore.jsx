/** @jsx jsx */
import { jsx } from '@emotion/react';

import { fontSizes } from '../../../theme/font-sizes';
import { space } from '../../../theme/space';

const styleReadMore = {
  paddingTop: space[5],
  fontSize: fontSizes[0],
};

const ReadMore = ({ to, title }) => (
  <a href={to} css={styleReadMore}>
    {title}
  </a>
);

export default ReadMore;
