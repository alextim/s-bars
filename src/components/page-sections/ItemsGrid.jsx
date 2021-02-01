/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import SectionItem from '../SectionItem';
import { Row, Col } from '../flex-grid';

const ItemsGrid = ({ items, cols }) => {
  if (!cols) {
    return (
      <Row>
        {items.map((item, i) => (
          <Col key={i}>
            <SectionItem data={item} />
          </Col>
        ))}
      </Row>
    );
  }

  const a = [];
  const ncols = cols.length;
  const nrows = Math.ceil(items.length / ncols);
  for (let row = 0; row < nrows; row++) {
    a.push(
      <Row key={row}>
        {items.slice(row * ncols, (row + 1) * ncols).map((item, i) => (
          <Col key={i} lg={cols[i]}>
            <SectionItem data={item} />
          </Col>
        ))}
      </Row>,
    );
  }
  return a;
};

export default ItemsGrid;
