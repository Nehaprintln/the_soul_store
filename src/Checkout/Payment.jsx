import React, {useState, useEffect} from 'react'
import './payment.css';
import Button from '../CommonLayout/Button/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
    const [cartTotal, setCartTotal] = useState(0);
    const GST = (cartTotal * 9)/100;
    const navigate = useNavigate();

    const placeOrderFunc = async() => {
      const userRegister = localStorage.getItem("authToken");
      try{
        const responce = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/`, {
          method: 'DELETE',
          headers: {
            projectID: "rhxg8aczyt09",
            'Authorization': `Bearer ${userRegister}`,
          },
        });
        // setCartList([]);
        if (responce.ok) {
          // Display SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'Order placed successfully!',
          }).then(() => {
            // Navigate to the men page after closing the SweetAlert
            navigate('/men');
          });
        } 
      }
      catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
        const storedCartTotal = localStorage.getItem("totalAmount");
    if (storedCartTotal) {
      setCartTotal(parseInt(storedCartTotal));
    }
    }, []);

  return (
    <>
    <div >
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
                    </div>
                    <div className="payment-process total">
                            <div>
                              <h5>Total Amount</h5>
                            </div>
                            <div>
                              <h5>₹ {(cartTotal + GST).toFixed(2)}</h5>
                            </div>
                    </div>
                    <Button className="continue-to-payment" text="PLACE ORDER" onClick={placeOrderFunc} />
    </>
  )
}
