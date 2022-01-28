import React from 'react';

import useLocaleData from '@/hooks/useLocaleData';
import { fontSizes } from '@/theme/font-sizes';
import { space } from '@/theme/space';

const styleWrap = {
  fontSize: fontSizes[0],
  marginBottom: space[2],
};

const Published = ({ date }) => {
  const { formatLocale } = useLocaleData();

  if (!date) {
    return null;
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return <div css={styleWrap}>{new Date(date).toLocaleDateString(formatLocale, options)}</div>;
};

export default React.memo(Published);
