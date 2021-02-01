/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import useLocaleData from '../../hooks/useLocaleData';
import { useTranslation } from '../../i18n';

const wrapperStyle = (t) => ({
  marginTop: t.space[5],
  fontSize: t.fontSizes[0],
});
const sepStyle = (t) => ({
  margin: `0 ${t.space[1]}`,
});

const PostInfo = ({ publishedDate, timeToRead }) => {
  const { formatLocale } = useLocaleData();
  const { t } = useTranslation();

  if (!publishedDate && !timeToRead) {
    return null;
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <div css={wrapperStyle}>
      {publishedDate && (
        <span css={wrapperStyle}>
          {new Date(publishedDate).toLocaleDateString(formatLocale, options)}
        </span>
      )}
      {publishedDate && timeToRead && <span css={sepStyle}>·</span>}
      {timeToRead && <span css={wrapperStyle}>{`${timeToRead} ${t('post.minToRead')}`}</span>}
    </div>
  );
};

export default React.memo(PostInfo);
