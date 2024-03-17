import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


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
      src: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web_copy_2.jpg?format=webp&w=1500&dpr=1.3',
      subCategory: 'jeans',
    },
    {
      id: 2,
      src: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_Mesh-Shirts.jpg?format=webp&w=1500&dpr=1.3',
      subCategory: 'shirt',
      
    },
    {
      id: 3,
      src: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/OS-T-shirts-homepage.jpg?format=webp&w=1500&dpr=1.3',
      subCategory: 'tshirt',
      
    },
    {
      id: 4,
      src: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage-banner_8.jpg?format=webp&w=1500&dpr=1.3',
      subCategory: 'jogger',
      
    }
  ];

  function WomenImageSlied(props) {
    const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

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
        <img src={item.src} alt={item.altText} style={{width: '100%', height: '500'}} onClick={() => navigate(`/filterProducts/${item.subCategory}/Women`)} />        
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

export {WomenImageSlied}