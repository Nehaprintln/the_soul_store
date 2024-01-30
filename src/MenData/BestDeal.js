import React, {useState, useEffect, Component} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const baseURL = 'https://academics.newtonschool.co';
const clothCategoryURL = '/api/v1/ecommerce/clothes/products?sort={"price":-1}';
const projectId = 'rhxg8aczyt09';

const BestDeal = ()=> {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    const [bestDeal, setBestDeal] = useState([]);

    useEffect(()=> {
        const bestDealData = async ()=> {
            try{
                const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"price":-1}',
                {
                    method: 'GET',
                    headers: {
                        projectID: 'rhxg8aczyt09'
                    }
                });
                if(!response.ok){
                    alert('Failed to fetch data')
                }
                const result = await response.json();
                console.log('BestDeal',result.data);
                setBestDeal(result.data);
            }catch(error){
                alert(error);
            }
        }
        bestDealData();
    }, [])
  return (
    <div className='bestDeal-container'>
        <button style={{position: 'absolute', top: '270px', left: '-15px', fontSize: '25px', zIndex: '8', border: 'none', background: 'none'}}><FaArrowAltCircleLeft /></button>
        <button style={{position: 'absolute', top: '270px', right: '-15px', fontSize: '25px', zIndex: '8', border: 'none', background: 'none'}}><FaArrowAltCircleRight /></button>
        <h2>BEST DEAL</h2>
        {/* <div className='bestDeal-innerContainer'> */}
            <Slider {...settings}>
            {bestDeal.map((card, index)=> (
                <div key={index} className='card-container'>
                    <div>
                        <img src={card.displayImage}  className='img-card' />
                    </div>
                    <h5>
                        {card.subCategory}
                    </h5>
                    <hr />
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <span>₹ {card.price}</span>
                        <span>rating {card.ratings.toFixed(2)}</span>
                    </div>
                </div>
            ))}
            </Slider>
        {/* </div> */}
    </div>
  )
}

export { BestDeal }
