/* eslint-disable react/no-array-index-key */
import Carousel from 'react-multi-carousel';

import { useTranslation } from '@/i18n';
import Section from '@/components/Section';

import CarouselItem from '../CarouselItem';
import './style.css';

const responsive = {
  dummy: {
    // the naming can be any, depends on you.
    breakpoint: { max: 40000, min: 0 },
    items: 1,
  },
};

const WorkCarousel = ({ title, subtitle, text, items }) => {
  const { t } = useTranslation();
  if (!items) {
    return null;
  }
  const heading = t('home.customer');

  return (
    <Section title={title} subtitle={subtitle} text={text}>
      <Carousel
        responsive={responsive}
        swipeable
        draggable={false}
        showDots
        infinite
        autoPlay
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="sb_carousel"
      >
        {items.map(({ title: customer, image, text: description }, i) => (
          <CarouselItem key={i} heading={heading} customer={customer} description={description} image={image} />
        ))}
      </Carousel>
    </Section>
  );
};

export default WorkCarousel;
