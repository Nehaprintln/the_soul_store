import React, {useState, useEffect} from 'react'
import './payment.css';
import Button from '../CommonLayout/Button/Button';

export default function Payment() {
    const [cartTotal, setCartTotal] = useState(0);
    const GST = (cartTotal * 9)/100;

    useEffect(() => {
        const storedCartTotal = localStorage.getItem("totalAmount");
    if (storedCartTotal) {
      setCartTotal(parseInt(storedCartTotal));
    }
    }, []);

  return (
    <>
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
                              <h5>₹ {(cartTotal + GST).toFixed(2)}</h5>
                            </div>
                    </div>
                    <Button className="continue-to-payment" text="Continue to Payment" onClick={() => {}} />
    </>
  )
}
