import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';
import { Link } from 'react-router-dom';

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className} id='arrowS'
        style={{ ...style, display: "block",}}
        onClick={onClick}
      />
    );
  }
export default function Carousel({latestCollection}) {
    var settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <div style={{width: '95%', margin: 'auto'}}>
         <div className="slider-container">
      <Slider {...settings}>
      {latestCollection.map((item, index) => (
            <div key={index}>
              <Link to={`/filterProducts/${item.name}/${item.gender}`} key={index}>
                <img src={item.img} alt={`Slide ${index}`} style={{ width: '100%' }} />
              </Link>
            </div>
          ))}
      </Slider>
    </div>
        </div>
  
        
      );
}
