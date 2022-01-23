import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { isMobile } from 'react-device-detect';

import SliderItem from '../SliderItem';
import './style.css';

const responsive = {
  desktop: {
    breakpoint: { max: 40000, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Slider = ({ items }) => {
  if (!items) {
    return null;
  }
  return (
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
      containerClass="carousel-container"
      removeArrowOnDeviceType={null}
      deviceType={isMobile ? 'mobile' : 'desktop'}
    >
      {items.map(({ title: itemTitle, image }, i) => (
        <SliderItem key={i} title={itemTitle} image={image} />
      ))}
    </Carousel>
  );
};
export default Slider;
