/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

const wrapStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
};

const linkStyle = (t) => ({
  margin: '0 1rem',
  padding: `${t.space[2]} 0`,
  textTransform: 'uppercase',
  ':hover': {
    color: t.colors.footer.highlight,
  },
});

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
