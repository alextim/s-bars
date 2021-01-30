/** @jsx jsx */
import { jsx } from '@emotion/react';

import SocialLink from './SocialLink';
import Utils from '../../lib/utils';
// import useSocialLinks from '../../hooks/useSocialLinks';

import Icon from '../Icon';

const wrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '1rem',
  paddingBottom: '1rem',
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
