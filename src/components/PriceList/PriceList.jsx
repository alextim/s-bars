import mq from '@/theme/media-queries';
import colors from '@/theme/colors';

import { useTranslation } from '@/i18n';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: 0,
  padding: 0,
  listStyleType: 'none',
};

const styleHeadRow = {
  backgroundColor: colors.tables.head,
  borderTop: 'none',
  borderBottom: `1px solid ${colors.black}`,
};

const styleRow = {
  display: 'grid',
  gridTemplateColumns: '1fr 5rem',
  gridTemplateRows: 'auto 1fr',
  borderTop: '1px solid #ccc',
  borderBottom: '1px solid #ccc',
  padding: '1.5rem 0',
  marginBottom: 0,
  [mq.lg]: {
    gridTemplateColumns: '35% 10rem auto',
    gridTemplateRows: 'auto',
  },
};

const styleCellDefault = {
  padding: '0 0.6rem',
};

const styleName = {
  ...styleCellDefault,
};

const stylePrice = {
  display: 'flex',
  ...styleCellDefault,
  gridColumn: 2,
  gridRow: '1 / span 2',
  alignItems: 'center',
  // justifyContent: 'center',
  [mq.lg]: {
    display: 'block',
    gridRow: 1,
  },
};

const styleDescription = {
  ...styleCellDefault,
  fontStyle: 'italic',
  paddingLeft: '1.25rem',
  [mq.lg]: {
    ...styleCellDefault,
  },
};

const Row = ({ children, overrideCSS = {} }) => <li css={{ ...styleRow, ...overrideCSS }}>{children}</li>;

const styleHeading = {
  fontWeight: 'bold',
  fontStyle: 'unset',
};

const styleDescriptionHeading = {
  display: 'none',
  [mq.lg]: {
    display: 'block',
  },
};
const Name = ({ children, overrideCSS = [] }) => <div css={[styleName, ...overrideCSS]}>{children}</div>;
const Price = ({ children, overrideCSS = [] }) => <div css={[stylePrice, ...overrideCSS]}>{children}</div>;
const Description = ({ children, overrideCSS = [] }) => <div css={[styleDescription, ...overrideCSS]}>{children}</div>;

const PriceList = ({ items }) => {
  const { t } = useTranslation();
  return (
    <ul css={styleWrap}>
      <Row overrideCSS={styleHeadRow}>
        <Name overrideCSS={[styleHeading]}>{t('priceList.name')}</Name>
        <Price overrideCSS={[styleHeading]}>{t('priceList.price')}</Price>
        <Description overrideCSS={[styleHeading, styleDescriptionHeading]}>{t('priceList.description')}</Description>
      </Row>
      {items.map(({ title: name, subtitle: price, text: description }, i) => (
        <Row key={i} overrideCSS={{ backgroundColor: i % 2 ? colors.tables.odd : colors.tables.even }}>
          <Name>{name}</Name>
          <Price>{price}</Price>
          <Description>{description}</Description>
        </Row>
      ))}
    </ul>
  );
};

export default PriceList;
