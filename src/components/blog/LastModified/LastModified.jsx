/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import useLocaleData from '../../../hooks/useLocaleData';
import { useTranslation } from '../../../i18n';

const wrapperStyle = (t) => ({
  marginTop: t.space[5],
  fontSize: t.fontSizes[0],
});

const LastModified = ({ date }) => {
  const { formatLocale } = useLocaleData();
  const { t } = useTranslation();

  if (!date) {
    return null;
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <div css={wrapperStyle}>
      <span>{t('post.dateModified')}</span>
      <span css={wrapperStyle}>{new Date(date).toLocaleDateString(formatLocale, options)}</span>
    </div>
  );
};

export default React.memo(LastModified);
