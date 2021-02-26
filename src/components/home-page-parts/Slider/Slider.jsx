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
import { fontSizes } from '../../../theme/font-sizes';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const styleWrap = {
  marginBottom: space[10],
};

const styleTitle = {
  marginTop: space[2],
  fontFamily: 'inherit',
  fontSize: fontSizes[3],
  fontWeight: 'inherit',
  textAlign: 'center',
};

const styleText = {
  marginTop: space[4],
  textAlign: 'center',
};

const Slider = ({ title, text, items }) => {
  return (
    <section css={styleWrap}>
      <Swiper slidesPerView={1} spaceBetween={0} navigation pagination autoplay loop>
        {items &&
          items.map(
            ({ title: itemTitle, subtitle: itemSubtitle, image, to, text: itemText }, i) => (
              <SwiperSlide key={i}>
                <SliderItem
                  title={itemTitle}
                  subtitle={itemSubtitle}
                  to={to}
                  text={itemText}
                  image={image}
                />
              </SwiperSlide>
            ),
          )}
      </Swiper>
      <h1 css={styleTitle}>{title}</h1>
      <div css={styleText} dangerouslySetInnerHTML={{ __html: text }} />
    </section>
  );
};

export default Slider;
