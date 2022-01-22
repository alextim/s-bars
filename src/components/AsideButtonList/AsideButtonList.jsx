import { space } from '@/theme/space';

import Button from '../Button';
import AsideWidget from '../AsideWidget';

const styleButton = {
  marginTop: space[4],
  width: '100%',
  justifyContent: 'center',
};

const overrideCSS = {
  textTransform: 'unset',
};

const AsideButtonList = ({ title: heading, items }) => (
  <AsideWidget title={heading}>
    {items.map(({ to, title }) => (
      <Button key={to} tag="href" variant="default" to={to} css={styleButton} overrideCSS={overrideCSS}>
        {title}
      </Button>
    ))}
  </AsideWidget>
);

export default AsideButtonList;
