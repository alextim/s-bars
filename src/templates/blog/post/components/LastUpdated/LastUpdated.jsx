import React from 'react';
import useLocaleData from '@/hooks/useLocaleData';
import { useTranslation } from '@/i18n';

const styleWrap = (t) => ({
  marginTop: t.space[5],
  fontSize: t.fontSizes[0],
});

const styleCaption = (t) => ({
  ':after': {
    content: '":"',
    marginRight: t.space[1],
  },
});

const LastUpdated = ({ date }) => {
  const { formatLocale } = useLocaleData();
  const { t } = useTranslation();

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <div css={styleWrap}>
      <span css={styleCaption}>{t('post.lastUpdated')}</span>
      {new Date(date).toLocaleDateString(formatLocale, options)}
    </div>
  );
};

export default React.memo(LastUpdated);
