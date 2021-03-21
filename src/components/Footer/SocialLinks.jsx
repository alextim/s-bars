/** @jsx jsx */
import { jsx } from '@emotion/react';
import Utils from '@alextim/utils';

import SocialLink from './SocialLink';
// import useSocialLinks from '../../hooks/useSocialLinks';

import Icon from '../Icon';

const wrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 0',
  marginBottom: '2rem',
  width: '100%',
};

const SocialLinks = ({ items }) => (
  <div css={wrapStyle}>
    {Object.keys(items).map((key) => (
      <SocialLink
        key={key}
        icon={<Icon name={key} />}
        name={Utils.upperFirst(key)}
        to={items[key].to}
        title={items[key].title}
      />
    ))}
  </div>
);

export default SocialLinks;
