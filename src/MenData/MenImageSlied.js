import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import men1 from '../Image/men-poster1.jpg';
import men2 from '../Image/men-poster2.jpg';
import men3 from '../Image/men-poster3.jpg';
import men4 from '../Image/men-poster5.jpg';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
  } from 'reactstrap';
  
  const items = [
    {
      id: 1,
      src: men1,
      altText: 'Slide 1',
      caption: 'Slide 1',
  
    },
    {
      id: 2,
      src: men2,
      altText: 'Slide 2',
      caption: 'Slide 2',
    },
    {
      id: 3,
      src: men3,
      altText: 'Slide 3',
      caption: 'Slide 3',
    },
    {
      id: 4,
      src: men4,
      altText: 'Slide 4',
      caption: 'Slide 4',
    }
  ];

  function MenImageSlied(props) {
    const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img src={item.src} alt={item.altText} style={{width: '100%', height: '500'}} />
        {/* <CarouselCaption
          className="text-danger"
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {`.custom-tag {
              max-width: 100%;
              height: 500px;
              background: transparent;
            }`}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export {MenImageSlied}