/** @jsx jsx */
import { jsx } from '@emotion/react';

import Icon from './Icon';

const IconLink = ({ children, to, icon, title, css = {}, ...props }) => {
  const styleWrap = {
    display: 'inline-flex',
    alignItems: 'center',
    ...css,
  };
  const styleLink = {
    marginLeft: `${icon ? '0' : '1'}.4em`,
  };
  return (
    <div css={styleWrap} title={title}>
      <Icon name={icon} />
      <a css={styleLink} href={to} {...props}>
        {children}
      </a>
    </div>
  );
};

export default IconLink;
