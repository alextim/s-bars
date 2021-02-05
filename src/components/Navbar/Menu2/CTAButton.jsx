/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import { useTranslation } from '../../../i18n';
import Button from '../../Button';

const style = {
  height: '3rem',
  margin: '2rem auto 2rem',
  [mq.lg]: {
    height: '2rem',
    margin: '0 1.5rem 0 0',
  },
};

const CTAButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button overrideCSS={style} onClick={onClick}>
      {t('nav.inquiry')}
    </Button>
  );
};

export default CTAButton;
