/** @jsx jsx */
import { jsx } from '@emotion/react';

import Section from '../Section';
import ItemsGrid from './ItemsGrid';

const SectionTriptych = ({ title, subtitle, text, items }) => (
  <Section title={title} subtitle={subtitle} text={text} textLast>
    <ItemsGrid items={items} cols={[3, 6, 3]} />
  </Section>
);

export default SectionTriptych;
