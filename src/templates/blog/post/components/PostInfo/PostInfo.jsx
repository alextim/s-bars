import React from 'react';
import useLocaleData from '@/hooks/useLocaleData';
import { useTranslation } from '@/i18n';

import { fontSizes } from '@/theme/font-sizes';
import { space } from '@/theme/space';

const styleWrap = {
  marginTop: space[5],
  marginBottom: space[5],
  fontSize: fontSizes[0],
};
const styleAuthor = {
  marginRight: space[3],
};
const styleSeparator = {
  margin: `0 ${space[1]}`,
};

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
      {datePublished && <span>{new Date(datePublished).toLocaleDateString(formatLocale, options)}</span>}
      {datePublished && timeToRead && <span css={styleSeparator}>·</span>}
      {timeToRead && <span>{`${timeToRead} ${t('post.minToRead')}`}</span>}
    </div>
  );
};

export default React.memo(PostInfo);
