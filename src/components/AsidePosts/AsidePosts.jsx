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
  margin: 0,
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

const AsidePosts = ({ title, items }) => {
  if (!items || !items.length) {
    return null;
  }
  return (
    <AsideWidget title={title}>
      <ul css={styleWrap}>
        {items.map(({ node: { title: itemTitle, slug: to } }) => (
          <li key={to} css={styleItem}>
            <a href={to} css={styleLink}>
              {itemTitle}
            </a>
          </li>
        ))}
      </ul>
    </AsideWidget>
  );
};

export default AsidePosts;
