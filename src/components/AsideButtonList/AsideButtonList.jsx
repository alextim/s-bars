/** @jsx jsx */
import { jsx } from '@emotion/react';
import Button from '../Button';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const styleButton = (t) => ({
  marginTop: t.space[4],
});

const overrideCSS = {
  textTransform: 'unset',
};

const AsideButtonList = ({ title, items }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div css={styleWrap}>
        {items.map(({ to, title: itemTitle }) => (
          <Button
            key={to}
            tag="link"
            variant="default"
            to={to}
            css={styleButton}
            overrideCSS={overrideCSS}
          >
            {itemTitle}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AsideButtonList;
