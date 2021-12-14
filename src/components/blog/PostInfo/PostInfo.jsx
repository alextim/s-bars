/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import useLocaleData from '../../../hooks/useLocaleData';
import { useTranslation } from '../../../i18n';

const styleWrap = (t) => ({
  marginTop: t.space[5],
  marginBottom: t.space[5],
  fontSize: t.fontSizes[0],
});
const styleAuthor = (t) => ({
  marginRight: t.space[3],
});
const styleSeparator = (t) => ({
  margin: `0 ${t.space[1]}`,
});

const PostInfo = ({ author, datePublished, timeToRead }) => {
  const { formatLocale } = useLocaleData();
  const { t } = useTranslation();

  if (!author && !datePublished && !timeToRead) {
    return null;
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <div css={styleWrap}>
      {author && author.length > 0 && <span css={styleAuthor}>{author.join(', ')}</span>}
      {datePublished && (
        <span>{new Date(datePublished).toLocaleDateString(formatLocale, options)}</span>
      )}
      {datePublished && timeToRead && <span css={styleSeparator}>·</span>}
      {timeToRead && <span>{`${timeToRead} ${t('post.minToRead')}`}</span>}
    </div>
  );
};

export default React.memo(PostInfo);
