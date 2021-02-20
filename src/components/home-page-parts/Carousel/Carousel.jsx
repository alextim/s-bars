/** @jsx jsx */
import { jsx } from '@emotion/react';

// https://swiperjs.com/react
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTranslation } from '../../../i18n';
import Section from '../../Section';
import Carouseltem from './Carouseltem';

import './swiper-styles.css';

SwiperCore.use([Navigation, Pagination]);

const Carousel = ({ title, subtitle, text, items }) => {
  const { t } = useTranslation();
  const heading = t('home.customer');
  return (
    <Section title={title} subtitle={subtitle} text={text}>
      <Swiper className="aaa" slidesPerView={1} spaceBetween={0} navigation pagination loop>
        {items &&
          items.map(({ title: customer, image, text: description }, i) => (
            <SwiperSlide key={i}>
              <Carouseltem
                heading={heading}
                customer={customer}
                description={description}
                image={image}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Section>
  );
};

export default Carousel;
