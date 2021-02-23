/** @jsx jsx */
import { jsx } from '@emotion/react';

import { space } from '../../theme/space';

import Button from '../Button';
import AsideWidget from '../AsideWidget';

const styleButton = {
  marginTop: space[4],
  width: '100%',
  justifyContent: 'center',
};

const AsideButtonList = ({ title: heading, items }) => (
  <AsideWidget title={heading}>
    {items.map(({ to, title }) => (
      <Button key={to} tag="link" variant="outlined" to={to} css={styleButton}>
        {title}
      </Button>
    ))}
  </AsideWidget>
);

export default AsideButtonList;
