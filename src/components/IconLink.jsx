/** @jsx jsx */
import { jsx } from '@emotion/react';

import Icon from './Icon';

const styleSpacer = {
  display: 'inline-block',
  width: '1em',
};

const style = { paddingLeft: '0.4em' };

const IconLink = ({ children, to, icon, title, extraStyle = {}, ...props }) => {
  return (
    <div css={{ display: 'inline-flex', alignItems: 'center', ...extraStyle }} title={title}>
      {icon ? <Icon name={icon} /> : <div css={styleSpacer} />}
      {to ? (
        <a css={style} href={to} {...props}>
          {children}
        </a>
      ) : (
        <span css={style} {...props}>
          {children}
        </span>
      )}
    </div>
  );
};

export default IconLink;
