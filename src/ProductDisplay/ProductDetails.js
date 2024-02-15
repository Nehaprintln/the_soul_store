// navigate work for page
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
// import { useSearch } from "../Context/GlobleContext";
import { useWishlist } from "../Context/GlobleContext";

import "./ProductDisplay.css";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Col,
} from "reactstrap";


export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('');
  const { id, subCategory } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [selectValue, setSelectValue] = useState(1);
  const navigate = useNavigate();
  // const {dispatch} = useCart();
  const [cartData, setCartData] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  // const {isAdd, setIsAdd} = useSearch();==================================================
  // const { checkProductStatusInWishlist, handleWishlistProduct, isInWishlist } = useWishlist();
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

  const checkProductStatusInWishlist = async ()=> {
    try{
      const userRegister = localStorage.getItem("authToken");
      console.log('userRegisterAuth==> ',userRegister)

      // Fetch the current wishlist
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
        method: 'GET',
        headers: {
          projectID: "rhxg8aczyt09",
          'Authorization': `Bearer ${userRegister}`,
        },
      });

      if(!response.ok){
        console.log('Failed to fetch wishlist');
        return;
      };

      const {data} = await response.json();
      const wishListData = data.items;
      console.log('whishlist product ALL DATA ==>', wishListData)

      // Check if the product is already in the wishlist
      const isProductInWishlist = wishListData.find(item => item.products._id === id);
      console.log('whishlist product by ID ==>', isProductInWishlist, id)
      

      if(isProductInWishlist){
        setIsInWishlist(true);
        console.log('found WISHLIST ID DATA by GEt')
      }

    }catch(error){
      console.log('WISHLIST ERROR ++>', error);
    }
  };

  const handleAddToCart = async ()=> {
    if(selectValue && selectedSize){
      try{
        const userRegister = localStorage.getItem("authToken");
        console.log('userRegisterAuth==> ',userRegister)
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,{
          method: 'PATCH',
          headers: {
            projectID: "rhxg8aczyt09",
            'Authorization': `Bearer ${userRegister}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'quantity': selectValue,
             'size': selectedSize,
          })
        });
  
        if(!response.ok){
          navigate('/signup')
          console.log('CartPatch Data ==')
          return;
        }
  
          const updatedCartData = await response.json();
          setCartData(prevCardData => [...prevCardData, updatedCartData]);
          // setIsAdd(!isAdd);==============================================================
          console.log('updatedCard', updatedCartData);
          console.log('add New cardDat==',cartData);
  
        // dispatch({type: 'ADD_TO_CART', payload: updatedCartData});
        // console.log('Add button click')
        }catch(error){
          console.log('Error CartItem==', error)
        }
    }else{
      alert('Please Select Size and quantity')
    }
    
  };

  const handleWishlistProduct = async (value)=> {
    console.log('wish LIST mount ==ID==', id)

    try{
      const url = 'https://academics.newtonschool.co/api/v1/ecommerce/wishlist/';
      const userRegister = localStorage.getItem("authToken");

      if(value === 'remove'){
        // If the product is already in the wishlist, remove it
        const removeToWishlist = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`, {
          method: 'DELETE',
          headers: {
            projectID: "rhxg8aczyt09",
            'Authorization': `Bearer ${userRegister}`,
          },
        });

        if(!removeToWishlist.ok){
          // navigate('/signup');
          console.error('Failed to remove product from wishlist');
          return;
        }
        console.log('=====REMOVE========')
        setIsInWishlist(false);
      }
      
      else if(value === 'add'){
        // If the product is not in the wishlist, add it
        const addToWishlist = await fetch(url, {
          method: 'PATCH',
        headers: {
          projectID: "rhxg8aczyt09",
          'Authorization': `Bearer ${userRegister}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'productId': id,
        }),
        });

        if(!addToWishlist.ok){
          // navigate('/signup');
        console.error('Failed to add product to wishlist');
        return;
        }
        console.log('=============')
        setIsInWishlist(true);
      }

    }catch(error){
        console.log('Error handling wishlist:', error)
      }

  //       // dispatch({type: 'ADD_TO_CART', payload: updatedCartData});
  //     // console.log('Add button click')
   };




  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
          {
            method: "GET",
            headers: {
              projectID: "rhxg8aczyt09",
            },
          }
        );

        if (!response.ok) {
          // alert("Failed to fetch data");
          console.log('Failed')
          navigate('/pageNotFound')
        }

        const result = await response.json();
        setProductDetails(result.data);
      } catch (error) {
        // alert(error);
        navigate('/pageNotFound')
      }
    }

    fetchProductDetails();
    checkProductStatusInWishlist();
    // handleAddToWishlist();
  }, [id, subCategory]);

  return (
    <>
      <Header />
      <MenSelectCategories />
      {productDetails.length < 1 ? (
        <div className="loader" style={{width: '100%', textAlign:'center', marginTop: '30px'}}>
          <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        </div>
        
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
          <div className="size-chart">
            <ul style={{ marginLeft: "-35px" }}>
              {productDetails?.size.map((size) => (
                <li>
                  <input
                    type="radio"
                    id="sizeS"
                    name="size"
                    value={size}
                    onChange={handleSizeChange}
                    checked={selectedSize === size}
                  />
                  <label
                    style={{
                      border:
                        selectedSize === size
                          ? "2px solid #117a7a"
                          : "2px solid #b3b3b3",
                    }}
                  >
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="quantity-container"
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            <span style={{ color: "#58595b" }}>Quantity</span>
            <span>
              <select value={selectValue} onChange={handleQuantityChange}>
                {/* <option value="">00</option> */}
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
              </select>
            </span>
          </div>
          <div className="button-container" style={{ marginBottom: "20px" }}>
            <button id="addCart" onClick={handleAddToCart}>ADD TO CARD</button>

            {isInWishlist ? (<button id="wishList" onClick={()=> handleWishlistProduct('remove')}><FaHeart  style={{color:'#117a7a'}} />ADDED TO WISHLIST </button>):(
            <button id="wishList" onClick={()=> handleWishlistProduct('add')}><FaRegHeart style={{color:'#117a7a'}} /> ADD TO WISHLIST </button>) }

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
