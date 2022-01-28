import utils from '@alextim/utils';

import SocialLink from './SocialLink';
// import useSocialLinks from '@/hooks/useSocialLinks';

import Icon from '../Icon';

const styleWrap = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 0',
  marginBottom: '2rem',
  width: '100%',
};

const SocialLinks = ({ items }) => (
  <div css={styleWrap}>
    {Object.keys(items).map((key) => (
      <SocialLink key={key} icon={<Icon name={key} />} name={utils.upperFirst(key)} to={items[key].to} title={items[key].title} />
    ))}
  </div>
);

export default SocialLinks;
