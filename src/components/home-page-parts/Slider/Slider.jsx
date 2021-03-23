/** @jsx jsx */
import { jsx } from '@emotion/react';

// https://swiperjs.com/react
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
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

import { space } from '../../../theme/space';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const styleWrap = {
  marginBottom: space[10],
};

const Slider = ({ items }) => {
  return (
    <section css={styleWrap}>
      <Swiper slidesPerView={1} spaceBetween={0} navigation pagination autoplay loop>
        {items &&
          items.map(({ title: itemTitle, image }, i) => (
            <SwiperSlide key={i}>
              <SliderItem title={itemTitle} image={image} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Slider;
