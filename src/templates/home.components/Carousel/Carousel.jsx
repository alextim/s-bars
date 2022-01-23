import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { isMobile } from 'react-device-detect';

import { useTranslation } from '@/i18n';
import Section from '@/components/Section';

import CarouselItem from '../CarouselItem';
import './style.css';

const responsive = {
  desktop: {
    breakpoint: { max: 40000, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
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
        swipeable
        draggable={false}
        showDots
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="sb_carousel"
        removeArrowOnDeviceType={null}
        deviceType={isMobile ? 'mobile' : 'desktop'}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {items.map(({ title: customer, image, text: description }, i) => (
          <CarouselItem key={i} heading={heading} customer={customer} description={description} image={image} />
        ))}
      </Carousel>
    </Section>
  );
};

export default WorkCarousel;
