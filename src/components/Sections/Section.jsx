import React from 'react';
import Section from '../Section';

const Sections = ({ data }) => {
  if (!data) {
    return null;
  }
  return data.map(({ title, subtitle, text, image, items }, i) => (
    <Section key={i} title={title} subtitle={subtitle} text={text} image={image} items={items} />
  ));
};

export default Sections;
