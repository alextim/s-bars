/** @jsx jsx */
import { jsx } from '@emotion/react';

import { useTranslation } from '../../i18n';
import AsideWidget from '../AsideWidget';

const styleLink = {
  display: 'block',
  textDecoration: 'none',
  position: 'relative',
  zIndex: 2,
  marginBottom: '3px',
  paddingBottom: '3px',
  borderBottomWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#b4d5e7',
  ':hover, :focus, :active': {
    textDecoration: 'none',
  },
};

const styleWrap = {
  listStyle: 'none outside',
};

const styleItem = {
  padding: '5px 15px',
  background: '#fff',
  position: 'relative',
  marginBottom: '10px',
  ':after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4px',
    height: '100%',
    backgroundColor: '#b4d5e7',
  },
  ':hover:after': {
    width: '100%',
  },
  ':hover a': {
    color: '#fff',
  },
  ':hover a, :hover:after': {
    transition: 'all .3s ease-in-out',
  },
};

const styleWidget = {
  '> h3': {
    textAlign: 'center',
  },
};

const AsideRecentPosts = ({ items }) => {
  const { t } = useTranslation();
  return (
    <AsideWidget title={t('post.widget.recent')} extraStyle={styleWidget}>
      <ul css={styleWrap}>
        {items.map(({ node: { frontmatter: { title }, fields: { slug: to } } }) => (
          <li key={to} css={styleItem}>
            <a href={to} css={styleLink}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </AsideWidget>
  );
};

export default AsideRecentPosts;
