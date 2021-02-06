/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

import { space } from '../../../theme/space';
import colors from '../../../theme/colors';

const wrapStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
};

const linkStyle = {
  margin: '0 1rem',
  padding: `${space[2]} 0`,
  textTransform: 'uppercase',
  ':hover': {
    color: colors.footer.highlight,
  },
};

const FooterNavigation = ({ items }) => (
  <div css={wrapStyle}>
    {items.map(({ to, title }) => (
      <Link key={to} css={linkStyle} to={to}>
        {title}
      </Link>
    ))}
  </div>
);

export default FooterNavigation;
