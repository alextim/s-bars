/** @jsx jsx */
import { jsx } from '@emotion/react';

import { useTranslation } from '../../../i18n';
import { fontSizes } from '../../../theme/font-sizes';
import { space } from '../../../theme/space';

const styleReadMore = {
  paddingTop: space[5],
  fontSize: fontSizes[0],
};

const ReadMore = ({ to }) => {
  const { t } = useTranslation();
  return (
    <a href={to} css={styleReadMore}>
      {t('post.readMore')}
    </a>
  );
};

export default ReadMore;
