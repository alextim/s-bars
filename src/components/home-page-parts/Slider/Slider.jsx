/** @jsx jsx */
import { jsx } from '@emotion/react';

// https://swiperjs.com/react
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import './swiper-styles.css';

import SliderItem from './SliderItem';

import { space } from '../../../theme/space';
import fonts from '../../../theme/fonts';
import { fontSizes } from '../../../theme/font-sizes';
import fontWerights from '../../../theme/font-weights';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const styleWrap = {
  marginBottom: space[10],
};

const styleTitle = {
  marginTop: space[2],
  fontFamily: fonts.body,
  fontSize: fontSizes[3],
  fontWeight: fontWerights.body,
  textAlign: 'center',
};

const styleText = {
  marginTop: space[4],
  textAlign: 'center',
};

const Slider = ({ title, text, items }) => {
  return (
    <section css={styleWrap}>
      <Swiper slidesPerView={1} spaceBetween={0} navigation pagination={{ clickable: true }} loop>
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
      <div css={styleText}>{text}</div>
    </section>
  );
};

export default Slider;
