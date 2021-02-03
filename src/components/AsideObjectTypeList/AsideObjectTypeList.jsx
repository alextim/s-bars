/** @jsx jsx */
import { jsx } from '@emotion/react';
import Button from '../Button';

import useObjectTypes from '../../hooks/useObjectTypes';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const styleButton = (t) => ({
  marginTop: t.space[4],
});

const overrideCSS = { textTransform: 'unset' };
const AsideObjectTypeList = () => {
  const { items, title: heading } = useObjectTypes();
  return (
    <div>
      <h2>{heading}</h2>
      <div css={styleWrap}>
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
      </div>
    </div>
  );
};

export default AsideObjectTypeList;
