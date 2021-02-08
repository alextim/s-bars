/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SliderItem from '../SliderItem';

import colors from '../../theme/colors';
import links from '../../theme/links';
import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const SectionSlider = ({ items }) => (
  <Slider dots arrows infinite speed={500} slidesToShow={1} slidesToScroll={1}>
    {items.map(({ title, subtitle, image, to, text }, i) => (
      <SliderItem key={i} title={title} subtitle={subtitle} to={to} text={text} image={image} />
    ))}
  </Slider>
);

export default SectionSlider;
