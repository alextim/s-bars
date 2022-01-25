/* eslint-disable react/no-array-index-key */
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import SliderItem from '../SliderItem';
import './style.css';

const responsive = {
  dummy: {
    // the naming can be any, depends on you.
    breakpoint: { max: 40000, min: 0 },
    items: 1,
  },
};

const Slider = ({ items }) => {
  if (!items) {
    return null;
  }
  return (
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
      containerClass="carousel-container"
    >
      {items.map(({ title: itemTitle, image }, i) => (
        <SliderItem key={i} title={itemTitle} image={image} />
      ))}
    </Carousel>
  );
};
export default Slider;
