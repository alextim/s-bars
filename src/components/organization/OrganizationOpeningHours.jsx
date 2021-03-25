/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import { useTranslation } from '../../i18n';

const wrapStyle = {
  display: 'grid',
  gridTemplateColumns: '4rem 3rem 1rem 3rem',
  rowGap: '0.1rem',
  columnGap: '0.1rem',
};
const dowStyle = {
  ':after': {
    content: '":"',
  },
};

const dayOffColumnStyle = {
  gridColumn: '2 / span 3',
};

const OrganizationOpeningHours = ({ openingHours }) => {
  const { t } = useTranslation();

  if (!openingHours) {
    return null;
  }

  const parseDow = (s) => {
    if (!s) {
      return '';
    }

    let dow = s.split('-');
    if (dow.length > 1) {
      return `${t(`dow.d2.${dow[0].trim()}`)}-${t(`dow.d2.${dow[1].trim()}`)}`;
    }

    dow = s.split(',');
    if (dow.length > 1) {
      return dow.reduce((acc, cur) => acc + (acc ? ', ' : '') + t(`dow.d2.${cur.trim()}`), '');
    }

    return t(`dow.d2.${s.trim()}`);
  };

  return (
    <div css={wrapStyle}>
      {openingHours.map(([dow, timeStart, timeFinish]) => (
        <React.Fragment key={dow}>
          <div css={dowStyle}>{parseDow(dow)}</div>
          {timeStart === timeFinish && timeFinish === '00:00' ? (
            <div css={dayOffColumnStyle}>{t(dow.length === 2 ? 'day_off' : 'days_off')}</div>
          ) : (
            <React.Fragment>
              <div>{timeStart}</div>
              <div>-</div>
              <div>{timeFinish}</div>
            </React.Fragment>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrganizationOpeningHours;
