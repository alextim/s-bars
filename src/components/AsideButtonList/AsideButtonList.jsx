/** @jsx jsx */
import { jsx } from '@emotion/react';

import { space } from '../../theme/space';

import Button from '../Button';
import AsideWidget from '../AsideWidget';

const styleButton = {
  marginTop: space[4],
};

const overrideCSS = {
  textTransform: 'unset',
};

const AsideButtonList = ({ title: heading, items }) => (
  <AsideWidget title={heading}>
    {items.map(({ to, title }) => (
      <Button
        key={to}
        tag="link"
        variant="default"
        to={to}
        css={styleButton}
        overrideCSS={overrideCSS}
      >
        {title}
      </Button>
    ))}
  </AsideWidget>
);

export default AsideButtonList;
