/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';

const style = {
  [mq.lg]: {
    marginRight: '3.5rem',
  },
};

const LegalInfo = ({ foundingDate, name, text }) => (
  <div css={style}>{`© ${
    foundingDate ? `${new Date(foundingDate).getFullYear()}-` : ''
  }${new Date().getFullYear()} ${name}${text ? `. ${text}` : ''}`}</div>
);

export default LegalInfo;
