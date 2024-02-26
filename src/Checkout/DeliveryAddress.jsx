import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import MenSelectCategories from '../MenData/MenSelectCategories'
import './delivery.css';
import Button from '../CommonLayout/Button/Button';
import { IoAddCircleSharp } from "react-icons/io5";

export default function DeliveryAddress() {
    const [cartTotal, setCartTotal] = useState(0);
    const GST = (cartTotal * 9)/100;
    const addressArray = []; 

    useEffect(() => {
        const storedCartTotal = localStorage.getItem("totalAmount");
    if (storedCartTotal) {
      setCartTotal(parseInt(storedCartTotal));
    }
    }, []);

  return (
    <>
        <Header />
        <MenSelectCategories />
    
        <div style={{ width: "30%", margin: "auto", padding: '20px' }}>
          <span
            style={{
              color: "#117a7a",
              fontFamily: "sans-serif",
              fontSize: "16px",
            }}
          >
            MY BAG {" "}<b>-------------</b> ADDRESS <b>------------- </b></span> PAYMENT
        </div>
        <div>
            <div style={{display: 'flex', gap: '20px', width: '100%', padding: '20px'}}>
                <div style={{width: '65%', display: 'flex', gap: '20px'}}>
                <div style={{width: '40%', height: '300px', background: '#edeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

                </div>
                <div style={{width: '40%', height: '300px', background: '#f8f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '0.1px solid #cccccc'}}>
                    <IoAddCircleSharp style={{fontSize: '50px', color: '#949191', cursor: 'pointer'}} />
                    <p style={{fontSize: '14px'}}>Add New Address</p>
                </div>
                </div>
                <div style={{width: '30%'}}>
                    <div>
                        <p>BILLING DETAILS</p>
                    </div>
                  
                    <div className="payment-process">
                            <div>
                              <p>Cart Total</p>
                            </div>
                            <div>
                              <p>₹ {cartTotal}</p>
                            </div>
                    </div>
                    <div className="payment-process">
                            <div>
                              <p>Member Discount</p>
                            </div>
                            <div>
                              <p>₹ -0.00</p>
                            </div>
                    </div>
                    <div className="payment-process">
                            <div>
                              <p>GST</p>
                            </div>
                            <div>
                              <p>₹ {GST}</p>
                            </div>
                    </div>
                    <div className="payment-process">
                            <div>
                              <p>Shipping Charges</p>
                            </div>
                            <div>
                              <p>₹ 0.00</p>
                            </div>
                    </div>
                    <div className="payment-process total">
                            <div>
                              <h5>Total Amount</h5>
                            </div>
                            <div>
                              <h5>₹ {cartTotal + GST}</h5>
                            </div>
                    </div>
                    <Button className="continue-to-payment" text="Continue to Payment" onClick={() => {}} />

                </div>
            </div>
            
        </div>
    </>
  )
}
