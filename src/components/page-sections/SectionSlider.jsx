/* eslint-disable no-console */
/** @jsx jsx */
import { jsx } from '@emotion/react';

// https://swiperjs.com/react
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import './swiper-styles.scss';

import SliderItem from '../SliderItem';
import { space } from '../../theme/space';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const styleWrap = {
  minWidth: '320px',
  // maxWidth: '1280px',
  margin: `0 auto ${space[10]}`,
};

const SectionSlider = ({ items }) => (
  <div css={styleWrap}>
    <Swiper slidesPerView={1} spaceBetween={0} navigation pagination={{ clickable: true }} autoplay>
      {items.map(({ title, subtitle, image, to, text }, i) => (
        <SwiperSlide key={i}>
          <SliderItem title={title} subtitle={subtitle} to={to} text={text} image={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default SectionSlider;
