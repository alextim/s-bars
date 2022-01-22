import mq from '@/theme/media-queries';

const style = {
  [mq.lg]: {
    marginRight: '3.5rem',
  },
};

const LegalInfo = ({ foundingDate, name, text }) => {
  const currentYear = new Date().getFullYear();
  let s = '';
  if (foundingDate) {
    const foundingYear = new Date(foundingDate).getFullYear();
    if (foundingYear !== currentYear) {
      s = `${foundingYear}-`;
    }
  }
  return <div css={style}>{`© ${s}${currentYear} ${name}${text ? `. ${text}` : ''}`}</div>;
};

export default LegalInfo;
