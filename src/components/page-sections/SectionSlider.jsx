/** @jsx jsx */
import { jsx } from '@emotion/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SliderItem from '../SliderItem';

import { space } from '../../theme/space';

const styleWrap = {
  marginBottom: space[10],
};

const SectionSlider = ({ items }) => (
  <div css={styleWrap}>
    <Slider dots arrows infinite speed={500} slidesToShow={1} slidesToScroll={1}>
      {items.map(({ title, subtitle, image, to, text }, i) => (
        <SliderItem key={i} title={title} subtitle={subtitle} to={to} text={text} image={image} />
      ))}
    </Slider>
  </div>
);

export default SectionSlider;
