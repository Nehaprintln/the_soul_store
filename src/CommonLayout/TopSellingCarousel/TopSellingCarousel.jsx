import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#848282" }}
        onClick={onClick}
      />
    );
  }
export default function TopSelling({topSelling}) {
    var settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
      {topSelling.map((item, index) => (
            <div
            // key={item._id}
            // style={{
            //   width: "24%",
            //   padding: "10px",
            //   position: "relative",
            // }}
          >
            <Link
              to={`/filterProducts/${item.subCategory}/${item.gender}/${item._id}`}
            >
              <img
                src={item.displayImage}
                style={{ width: "100%" }}
              />
            </Link>
            <div
              style={{
                borderBottom: "0.5px solid gray",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </div>
            <span>{item.gender} </span>
            <span> {item.subCategory}</span>
            <div>₹ {item.price}</div>
          </div>
          ))}
      </Slider>
    </div>
        </div>
  
        
      );
}
