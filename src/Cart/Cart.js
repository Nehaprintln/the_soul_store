import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MenSelectCategories from "../MenData/MenSelectCategories";
import { FaRegHeart } from "react-icons/fa";
import emptyCart from "../Image/Screenshot 2024-02-14 160536.png";
// import ProductDetails from "../ProductDisplay/ProductDetails";
// import { useWishlist } from "../Context/GlobleContext";
import Button from "../CommonLayout/Button/Button";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Col,
} from "reactstrap";

// import { getData } from "../Afunc/Function";


export default function Cart() {
  // const { id } = useParams();
  // // const {state} = useCart(useContext);
  // const cartItems = state?.cartItems;
  // console.log('WISHLIST PRODUCT',cartItems);
  // console.log(id);
  const [cartList, setCartList] = useState([]);
  const [CartTotal, setCartTotal] = useState(0);
  // const {checkProductStatusInWishlist, setIsInWishlist, isInWishlist, handleWishlistProduct} = useWishlist();
  // const {isAdd} = useSearch();==================================
  // const {selectedSize} = ProductDetails();


  const fetchCartData = async () => {
    try {
      const userRegister = localStorage.getItem("authToken");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
            Authorization: `Bearer ${userRegister}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("CartPatch Data ==");
        return;
      }

      // const updatedCartData = await response.json();
      const { data } = await response.json();
      const cartData = data.items;
      console.log("CartPatch Data ==", cartData);

      setCartList(cartData);
      calculateTotalPrice(cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    const storedCartTotal = localStorage.getItem("totalAmount");
    console.log('inside useEffect', CartTotal)
    if (storedCartTotal) {
      setCartTotal(parseInt(storedCartTotal));
    }
    fetchCartData();
    
  }, []); //isAdd

  const handleRemoveFromCart = async (productId) => {
    console.log("productID CART ==> ", productId);
    try {
      const userRegister = localStorage.getItem("authToken");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            projectID: "rhxg8aczyt09",
            Authorization: `Bearer ${userRegister}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("CartPatch Data ==");
        return;
      }
      await fetchCartData();
      //  calculateTotalPrice();
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const calculateTotalPrice = (cartData)=> {
    const totalAmount = cartData.reduce((total, item)=> {
      return total + (item?.product.price * item.quantity);
     }, 0);

     setCartTotal(totalAmount);
     localStorage.setItem('cartLenght', cartData.length.toString());
     localStorage.setItem('totalAmount', totalAmount.toString());

  }

  const handleMoveToWishlist = (productId) => {};

  return (
    <>
      <Header />
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
        <Button className="removeAll" text='REMOVE ALL'  />
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
                          <button
                            id="movewishList"
                            onClick={() => handleMoveToWishlist(list._id)}
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
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="placeOrder-container" style={{width: '35%'}}>
              <div className="place-order" >
                <p style={{width: '70%',padding: '10px', textAlign: 'center', background: '#117a7a', borderRadius: '5px', color: '#fff', fontSize: '14px', fontWeight: '700'}}>PLACE ORDER</p>
              </div>
              <div style={{width: '70%',padding: '10px', background: '#ffb951', borderRadius: '5px'}}>
                <input type="checkbox" />
                <label style={{ textAlign: 'center', color: '#111', fontSize: '14px', fontWeight: '700'}}> Save an additional ₹ 500 on this order</label>
              </div>
              <div className="accordion-container" style={{width: '70%', marginTop: '10px'}}>
            <UncontrolledAccordion defaultOpen="1">
            <AccordionItem>
                <AccordionHeader targetId="1">Apply Coupon</AccordionHeader>
                <AccordionBody accordionId="1">
                  <p>
                   <input type="text" placeholder="Enter Code Here" />
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">Gift Voucher</AccordionHeader>
                <AccordionBody accordionId="2">
                  <p>
                    <input type="text" placeholder="Enter Code Here" />
                  </p>
                </AccordionBody>
              </AccordionItem>
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
