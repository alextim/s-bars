/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

import { space } from '../../../theme/space';

import styleA from '../styleA';

const styleWrap = {
  display: 'inline-flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
  ...styleA,
};

const styleLink = {
  margin: '0 1rem',
  padding: `${space[2]} 0`,
  textTransform: 'uppercase',
};

const FooterNavigation = ({ items }) => (
  <div css={styleWrap}>
    {items.map(({ to, title }) => (
      <Link key={to} css={styleLink} to={to}>
        {title}
      </Link>
    ))}
  </div>
);

export default FooterNavigation;
