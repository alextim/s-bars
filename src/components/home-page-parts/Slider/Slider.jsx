/** @jsx jsx */
import { jsx } from '@emotion/react';

// https://swiperjs.com/react
// import Swiper core and required modules
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 *
 * BUG
 *
 * Importing styles in separate files does't work in build neither with SCSS nor CSS
 * but in development mode it's OK
 *
 */
/*
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
*/
import 'swiper/swiper-bundle.min.css';

import './swiper-styles.css';

import SliderItem from './SliderItem';

// install Swiper modules
// SwiperCore.use([Navigation, Pagination, Autoplay]);
SwiperCore.use([Navigation, Pagination]);
//   <Swiper slidesPerView={1} spaceBetween={0} navigation pagination autoplay loop>

const Slider = ({ items }) => (
  <Swiper slidesPerView={1} spaceBetween={0} navigation pagination>
    {items &&
      items.map(({ title: itemTitle, image }, i) => (
        <SwiperSlide key={i}>
          <SliderItem title={itemTitle} image={image} />
        </SwiperSlide>
      ))}
  </Swiper>
);

export default Slider;
