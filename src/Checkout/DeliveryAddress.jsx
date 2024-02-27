import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import MenSelectCategories from '../MenData/MenSelectCategories'
import Button from '../CommonLayout/Button/Button';
import { IoAddCircleSharp } from "react-icons/io5";
import Address from './Address';
import Payment from './Payment';

export default function DeliveryAddress() {

    const [addressModal, setAddressModal] = useState(false);
    const [displayAddress, setDisplayAddress] = useState();
    // const userAddress = localStorage.getItem("userAddress");
    // setDisplayAddress(userAddress);

    console.log(displayAddress);

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
                  {displayAddress && (
                      <div className='display-address-container' style={{width: '40%', height: '300px', background: '#edeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                      <h5>{`${displayAddress.firstName} ${displayAddress.lastName}`} <span>{displayAddress.addressType}</span></h5>
                      <p>{displayAddress.houseName}</p>
                      <p>{displayAddress.street}</p>
                      <p>{displayAddress.landmark}</p>
                      <p>{displayAddress.city} {displayAddress.postalCode}</p>
                    </div>
                  )}

                <div style={{width: '40%', height: '300px', background: '#f8f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '0.1px solid #cccccc'}}>
                    <IoAddCircleSharp style={{fontSize: '50px', color: '#949191', cursor: 'pointer'}} onClick={() => setAddressModal(!addressModal)} />
                    <p style={{fontSize: '14px'}} >Add New Address</p>
                    {addressModal && <Address closeModal={() => setAddressModal(!addressModal)} sendAddressFunc={(address) => setDisplayAddress(address)} />}
                </div>
                </div>
                <div style={{width: '30%'}}>
                    <div>
                        <p>BILLING DETAILS</p>
                    </div>
                    <Payment />  

                </div>
            </div>
            
        </div>
    </>
  )
}
