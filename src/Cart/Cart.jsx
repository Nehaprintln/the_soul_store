import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import emptyCart from "../Image/Screenshot 2024-02-14 160536.png";
import Button from "../CommonLayout/Button/Button";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { cartProductData, fetchWishlistResponse, removeFromCart, wishlistAdd } from "../APIData/fetchAPI";
import { useSearch } from "../Context/GlobleContext";
import { containerClasses } from "@mui/material";
import { BsCashCoin } from "react-icons/bs";
import { MdDoubleArrow, MdOutlineCreditCardOff } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
// import { getData } from "../Afunc/Function";


export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [CartTotal, setCartTotal] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const {setCartItemCounts} = useSearch();
  console.log('wishlistProducts DATA==>',wishlistProducts );
  const navigate = useNavigate();
  

  const fetchCartData = async () => {
    try {
      const cartItem =  await cartProductData();
      setCartItemCounts(cartItem?.results)
      const { data } =  cartItem
      const cartData = data.items;
      console.log("CartPatch Data ==", cartData);

      setCartList(cartData);
      calculateTotalPrice(cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const fetchWishlistData = async () => {
    try{
      const {data} = await fetchWishlistResponse();
      const wishlistData = data.items;
      console.log('WISHLIST DATA',wishlistData );

      setWishlistProducts(wishlistData.map((item) => item?.products?._id));

    }catch(error){
      console.log('WISHLIST error',error );

    }
  };


  const handleRemoveFromCart = async (productId) => {
    console.log("productID CART ==> ", productId);
    try {
       await removeFromCart(productId);
      // ===
      await fetchCartData();
      //  setCartList((prevCartData) => prevCartData.filter(item => item?.product?._id !== productId));
      //  calculateTotalPrice(cartList);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const calculateTotalPrice = (cartData)=> {
    const totalAmount = cartData.reduce((total, item)=> {
      return total + (item?.product.price * item.quantity);
     }, 0);

     setCartTotal(totalAmount);
     localStorage.setItem('cartLength', cartData.length.toString());
     localStorage.setItem('totalAmount', totalAmount.toString());

  };

  const handleMoveToWishlist = async (wishlistProduct) => {
    try{
      await wishlistAdd(wishlistProduct);
// TODO: TODO: TODO:
      const productId = wishlistProduct?.products?._id;
      handleRemoveFromCart(productId);
    }catch(error){

    }
  };

  const RemoveAllProduct = async() => {
    const userRegister = localStorage.getItem("authToken");
    try{
      const responce = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/`, {
        method: 'DELETE',
        headers: {
          projectID: "rhxg8aczyt09",
          'Authorization': `Bearer ${userRegister}`,
        },
      });
      setCartList([]);
    }
    catch(error){
      console.log(error);
    }
  }

    useEffect(() => {
    const storedCartTotal = localStorage.getItem("totalAmount");
    console.log('inside useEffect', CartTotal)
    if (storedCartTotal) {
      setCartTotal(parseInt(storedCartTotal));
    }
    fetchCartData();
    fetchWishlistData();
    
  }, []); //isAdd

  return (
    <>
      {/* <Header /> */}
      <MenSelectCategories />
      <div
        className="trac-process"
        style={{
          width: "100%",
          height: "35px",
          margin: "20px  0",
          color: "#58595b",
          fontSize: "14px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ width: "30%", margin: "auto" }}>
          <span
            style={{
              color: "#117a7a",
              fontFamily: "sans-serif",
              fontSize: "16px",
            }}
          >
            MY BAG
          </span>{" "}
          <b>-------------</b> ADDRESS ------------- PAYMENT
        </div>
      </div>
      {cartList.length === 0 ? (
        <div style={{ width: "40%", margin: "auto" }}>
          <img src={emptyCart} />
        </div>
      ) : (
        <>
        <div style={{width: '80%', margin: 'auto'}}>
        <Button className="removeAll" text='REMOVE ALL' onClick={RemoveAllProduct} />
        </div>
          <div className="cart-display-container" style={{ width: "100%", display: 'flex' }}>
            <div
              className="card-placeOrder-container"
              style={{ width: "50%", margin: "auto", paddingTop: "20px" }}
            >
              <div className="cart-container" style={{}}>
                <ul>
                  {cartList.map((list) => (
                    <li
                      key={list?.product._id}
                      style={{
                        width: "90%",
                        maxHeight: "300px",
                        border: "1px solid #eee",
                        padding: "5px",
                        color: "#545353",
                      }}
                    >
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div style={{ width: "30%", padding: "10px" }}>
                          <img
                            src={list?.product.displayImage}
                            alt={list?.product.name}
                            style={{ width: "100%", borderRadius: "8px" }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "70%",
                            padding: "10px 0",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              {list?.product.name}
                            </p>
                            <span>Size: {list.size} </span>
                            <span style={{ marginLeft: "12px" }}>
                              Qty: {list.quantity}
                            </span>
                          </div>

                          <div style={{}}>
                            <p>₹ {list?.product.price}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="button-container"
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        <div
                          style={{
                            padding: "15px 5px",
                            display: "flex",
                            gap: "10px",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            style={{
                              height: "30px",
                              width: "20%",
                              background: "#fff",
                              border: "1px solid #545353",
                              textAlign: "center",
                              borderRadius: "10px",
                            }}
                            id="removeCart"
                            onClick={() =>
                              handleRemoveFromCart(list?.product._id)
                            }
                          >
                            REMOVE
                          </button>
                          { wishlistProducts.includes(list?.product._id) ? "" : (<button
                            id="movewishList"
                            onClick={() => handleMoveToWishlist(list)}
                            style={{
                              height: "30px",
                              width: "30%",
                              background: "#fff",
                              border: "1px solid #545353",
                              textAlign: "center",
                              borderRadius: "10px",
                            }}
                          >
                             MOVE TO WISHLIST
                          </button>)}
                            
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="placeOrder-container" style={{width: '35%'}}>
              <div className="place-orderButton" >
                <Button className='place-order' text='Proceed to Buy' onClick={() => navigate('/delivery-address')}/>
              </div>
              <div style={{width: '70%',padding: '10px', background: '#ffb951', borderRadius: '5px'}}>
                <input type="checkbox" />
                <label style={{ textAlign: 'center', color: '#111', fontSize: '14px', fontWeight: '700'}}> Save an additional ₹ 500 on this order</label>
              </div>
              <div className="accordion-container" style={{width: '70%', marginTop: '10px'}}>
            <UncontrolledAccordion defaultOpen="1">
            <AccordionItem>
                <AccordionHeader targetId="1">Select Payment Mode</AccordionHeader>
                <AccordionBody accordionId="1">
                  {/* <p>
                   <input type="text" placeholder="Enter Code Here" />
                  </p> */}
                  <div className="payment-options">
                      <label>
                        <input type="radio" name="paymentMode" value="cod" style={{scale: '1.3'}} />
                        <BsCashCoin style={{margin: '2px 5px'}} />
                        Cash on Delivery
                      </label>
                      <br />
                      <label>
                        <input type="radio" name="paymentMode" value="upi" style={{scale: '1.3'}} />
                        <MdDoubleArrow style={{margin: '2px 5px'}} />
                        UPI
                      </label>
                      <br />
                      <label>
                        <input type="radio" name="paymentMode" value="credit-card" style={{scale: '1.3'}} />
                        <CiCreditCard1 style={{margin: '2px 5px'}} />
                        Credit Card
                      </label>
                      <br />
                      <label>
                        <input type="radio" name="paymentMode" value="debit-card" style={{scale: '1.3'}} />
                        <MdOutlineCreditCardOff style={{margin: '2px 5px'}} />
                        Debit Card
                      </label>
                      
                 </div>
                </AccordionBody>
                 
              </AccordionItem>
              {/* <AccordionItem>
                <AccordionHeader targetId="2">Gift Voucher</AccordionHeader>
                <AccordionBody accordionId="2">
                  <p>
                    <input type="text" placeholder="Enter Code Here" />
                  </p>
                </AccordionBody>
              </AccordionItem> */}
              <AccordionItem>
                <AccordionHeader targetId="3">Gift Wrap (₹ 25)</AccordionHeader>
                <AccordionBody accordionId="3">
                  <p>
                    <input type="checkbox" placeholder="Enter Code Here" />
                    Gift Wrap 
                  </p>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
            <div className="total-amount" style={{display: 'flex', marginTop: '20px', gap: '50px', padding: '5px', border: '2px dotted #58595b', borderRadius: '5px'}}>
                            <div>
                              <h5>Cart Total</h5>
                            </div>
                            <div>
                              <h5>₹ {CartTotal}</h5>
                            </div>
            </div>
          </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}
