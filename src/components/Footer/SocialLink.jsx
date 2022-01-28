import colors from '@/theme/colors';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: colors.footer.text,
  textDecoration: 'none',
  height: '2rem',
  width: '2rem',
  margin: '0 0.625rem',
  border: '0.125rem solid',
  borderColor: colors.footer.text,
  borderRadius: '4px',

  ':hover': {
    color: colors.footer.bg,
    backgroundColor: colors.footer.highlight,
    border: '0.125rem solid transparent',
    transition: 'all 0.4s ease-out 0s',
  },
};

// Google Does Not Use rel=me Microformats
// rel="me noreferrer"
const SocialLink = ({ icon, name, title, to }) => (
  <a css={style} href={to} target="_blank" rel="noreferrer" aria-label={name} title={title}>
    {icon}
  </a>
);

export default SocialLink;
