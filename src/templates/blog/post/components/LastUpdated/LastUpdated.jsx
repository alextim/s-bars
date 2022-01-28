import React from 'react';
import useLocaleData from '@/hooks/useLocaleData';
import { useTranslation } from '@/i18n';
import { fontSizes } from '@/theme/font-sizes';
import { space } from '@/theme/space';

const styleWrap = {
  marginTop: space[5],
  fontSize: fontSizes[0],
};

const styleCaption = {
  ':after': {
    content: '":"',
    marginRight: space[1],
  },
};

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
