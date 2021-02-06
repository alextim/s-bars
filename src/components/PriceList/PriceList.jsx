/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import colors from '../../theme/colors';

import { useTranslation } from '../../i18n';

const styleWrap = {
  width: '100%',
  borderCollapse: 'collapse',
  '> tbody, > thead': {
    display: 'table-row-group!important',
  },
  td: {
    borderWidth: '1px 0 1px 0',
    borderColor: '#ced5d9',
  },
};

const styleCell = {
  padding: '1.5rem 0.6rem',
  border: '0 solid #ccc',
};

const styleHeadRow = {
  backgroundColor: colors.tables.head,
};

const styleRow = {
  ':nth-of-type(even)': {
    backgroundColor: colors.tables.even,
  },
  ':nth-of-type(odd)': {
    backgroundColor: colors.tables.odd,
  },
};

const styleName = {
  marginBottom: space[2],
  [mq.lg]: {
    marginBottom: 0,
  },
};

const styleVisibleMobile = {
  [mq.lg]: {
    display: 'none',
  },
};

const styleDescriptionCol = {
  display: 'none',
  [mq.lg]: {
    display: 'table-cell',
  },
};

const Row = ({ children, overrideCSS }) => <tr css={overrideCSS || styleRow}>{children}</tr>;
const Cell = ({ children, extraStyle = {} }) => (
  <td css={{ ...styleCell, ...extraStyle }}>{children}</td>
);

const styleHead = {
  borderWidth: '0 0 1px 0',
  borderColor: colors.black,
};
const THead = ({ children, extraStyle = {} }) => (
  <th css={{ ...styleCell, ...styleHead, ...extraStyle }}>{children}</th>
);

const NameHead = ({ children }) => <THead>{children}</THead>;
const PriceHead = ({ children }) => <THead>{children}</THead>;
const DescriptionHead = ({ children }) => (
  <THead extraStyle={styleDescriptionCol}>{children}</THead>
);

const NameCell = ({ children }) => <Cell>{children}</Cell>;
const PriceCell = ({ children }) => <Cell>{children}</Cell>;
const DescriptionCell = ({ children }) => <Cell extraStyle={styleDescriptionCol}>{children}</Cell>;

const PriceList = ({ items }) => {
  const { t } = useTranslation();
  return (
    <table css={styleWrap}>
      <thead>
        <Row overrideCSS={styleHeadRow}>
          <NameHead>{t('priceList.name')}</NameHead>
          <PriceHead>{t('priceList.price')}</PriceHead>
          <DescriptionHead>{t('priceList.description')}</DescriptionHead>
        </Row>
      </thead>
      <tbody>
        {items.map(({ title: name, subtitle: price, text: description }, i) => (
          <Row key={i}>
            <NameCell>
              <div css={styleName}>{name}</div>
              <div css={styleVisibleMobile}>{description}</div>
            </NameCell>

            <PriceCell>{price}</PriceCell>
            <DescriptionCell>{description}</DescriptionCell>
          </Row>
        ))}
      </tbody>
    </table>
  );
};

export default PriceList;
