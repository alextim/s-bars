/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import useLocaleData from '../../../hooks/useLocaleData';

const styleWrap = (t) => ({
  fontSize: t.fontSizes[0],
  marginBottom: t.space[2],
});

const Published = ({ date }) => {
  const { formatLocale } = useLocaleData();

  if (!date) {
    return null;
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return <div css={styleWrap}>{new Date(date).toLocaleDateString(formatLocale, options)}</div>;
};

export default React.memo(Published);
