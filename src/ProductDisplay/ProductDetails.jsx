
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSearch, useWishlist } from "../Context/GlobleContext";
// import {handleWishlistProduct} from "../WishList/wishlistData";
import { checkProductStatusInWishlist, handleAddToCart, handleWishlistProduct } from "./ProductDetailsMethod";
import Button from "../CommonLayout/Button/Button";
import Loader from "../CommonLayout/Loader/Loader";
import { fetchProductDetails } from "../APIData/fetchAPI";
import "./ProductDisplay.css";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Col,
} from "reactstrap";
import QuantitySelect from "./QuantitySelect";
import SizeSelect from "./SizeSelect";


export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('');
  const { id, subCategory } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [selectValue, setSelectValue] = useState(1);
  const navigate = useNavigate();
  const {isInWishlist, setIsInWishlist} = useSearch();
  console.log('ID==> & SUNCATEGARIES==',id, subCategory);
  console.log(typeof(id))

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value)
    setSelectValue(value);
  };
  console.log(selectValue);

  const handleSizeChange = (event) => {
    console.log("event happend");
    setSelectedSize(event.target.value);
    console.log("event",event.target.value);
  };
  console.log("Selected Size==> ", selectedSize);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProductDetails(id);
        setProductDetails(result.data);
        await checkProductStatusInWishlist(id, setIsInWishlist);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Call the async function immediately
  
  }, [id, subCategory]);

  return (
    <>
      <Header />
      <MenSelectCategories />
      {productDetails.length < 1 ? (
       <Loader className='loader' />
      ) : (
        <div className="product-container">
        <div className="image-container" style={{ width: "58%" }}>
          <div className="image-div">
            {productDetails?.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productDetails.name}
                style={{ width: "49%" }}
              />
            ))}
          </div>
        </div>
        <div className="product-details-container">
          <div className="product-name">
            <h4>{productDetails?.name}</h4>
            <span>{productDetails?.gender} </span>
            <span>{productDetails?.subCategory}</span>
          </div>
          <div className="product-price">
            <h4 id="price">₹ {productDetails?.price}</h4>
          </div>
          <QuantitySelect className="quantity-container" text="Quantity" handleQuantityChange={handleQuantityChange} selectValue={selectValue} />
          <SizeSelect className="size-chart" productDetails={productDetails} handleSizeChange={handleSizeChange} selectedSize={selectedSize} />

         
          <div className="button-container" style={{ marginBottom: "20px" }}>
            <Button className="addCart" text='ADD TO CARD' onClick={()=> handleAddToCart(id, selectValue, selectedSize,navigate)} />

            {isInWishlist ? (<Button className="wishList" text=' ADDED TO WISHLIST' onClick={()=> handleWishlistProduct(productDetails, setIsInWishlist,'remove')}><FaHeart  style={{color:'#117a7a'}} /> </Button>):(
            <Button className="wishList" text=' ADD TO WISHLIST' onClick={()=> handleWishlistProduct(productDetails, setIsInWishlist,'add')}><FaRegHeart style={{color:'#117a7a'}} /></Button>) }

            {/* <button id="wishList" onClick={handleAddToWishlist}>
              <FaRegHeart style={{color: isInWishlist ? 'green' : 'red'}} /> 
             {isInWishlist ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'} 
            </button> */}
          </div>
          <div className="accordion-container">
            <UncontrolledAccordion defaultOpen="1">
              <AccordionItem>
                <AccordionHeader targetId="1">Product Details</AccordionHeader>
                <AccordionBody accordionId="1">
                  <div dangerouslySetInnerHTML={{
                            __html: productDetails?.description
                            }}></div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">Artist's Details</AccordionHeader>
                <AccordionBody accordionId="2">
                  <p>
                    The Souled Store was born out of a simple idea - love what
                    you do and follow your soul! Thus, our goal is to give
                    everyone something they'll love, something they can use to
                    express themselves, and, simply put, something to put a
                    smile on their face. So, whether it's superheroes like
                    Superman, TV shows like F.R.I.E.N.D.S, pop culture, music,
                    sports, or quirky, funny stuff you're looking for, we have
                    something for everyone. TSS Originals or The Souled Store
                    Originals is our exclusive range of funny, funky, trendy and
                    stylish designs. Designed by our kick-ass team of in-house
                    designers, TSS Originals are some cool and quirky designs
                    that help you speak your vibe.
                  </p>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </div>
        </div>
      </div>
      )}
      
    </>
  );
}
