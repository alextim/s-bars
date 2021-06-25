/** @jsx jsx */
import { jsx } from '@emotion/react';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiper-styles.scss';

import SliderItem from './SliderItem';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Slider = ({ items }) => (
  <Swiper slidesPerView={1} spaceBetween={0} navigation pagination autoplay loop>
    {items &&
      items.map(({ title: itemTitle, image }, i) => (
        <SwiperSlide key={i}>
          <SliderItem title={itemTitle} image={image} />
        </SwiperSlide>
      ))}
  </Swiper>
);

export default Slider;
