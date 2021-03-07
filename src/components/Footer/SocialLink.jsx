/** @jsx jsx */
import { jsx } from '@emotion/react';

const style = (t) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: t.colors.footer.text,
  textDecoration: 'none',
  height: '2rem',
  width: '2rem',
  margin: '0 0.625rem',
  border: '0.125rem solid',
  borderColor: t.colors.footer.text,
  borderRadius: '4px',

  ':hover': {
    color: t.colors.footer.bg,
    backgroundColor: t.colors.footer.highlight,
    border: '0.125rem solid transparent',
    transition: 'all 0.4s ease-out 0s',
  },
});

const SocialLink = ({ icon, name, title, to }) => (
  <a css={style} href={to} target="_blank" rel="noreferrer" aria-label={name} title={title}>
    {icon}
  </a>
);

export default SocialLink;
