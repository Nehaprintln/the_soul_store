import React, { useState } from 'react'
import './address.css';
import Button from '../CommonLayout/Button/Button'
import { OuterMargin } from '../CommonLayout/OuterMargin/OuterMargin';

export default function Address(props) {
  const {closeModal, sendAddressFunc} = props;
  const [addresstype, setAddressType] = useState('home');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [houseName, setHouseName] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');

  const countryArray = ['India', 'USA', 'UK'];
  const stateArray = ['Select State','Arunachal Pradesh', 'Bihar', 'Chandigarh', 'delhi', 'Goa', 'Haryana', 'Jammu and Kashmir', 'Kerela', 'Maharashtra', 'Uttar Pradesh']
  
  const handleAddressSend = (event) => {
    event.preventDefault();

    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      houseName.trim() === '' ||
      street.trim() === '' ||
      postalCode.trim() === '' ||
      city.trim() === '' ||
      country.trim() === 'Select Country' ||
      state.trim() === 'Select State'
    ) {
      // Show an alert or any other feedback to indicate that required fields are missing
      alert('Please fill in all the required fields.');
      return;
    }
    const newAddressObj = {
      firstName, lastName, addresstype, houseName, street, landmark, postalCode, city, country, state
    };

    const newAddress = JSON.stringify(newAddressObj);
    localStorage.setItem("userAddress", newAddress);
    sendAddressFunc(newAddress);
    closeModal();
  }
  
  return (
    <>
    <div className='address-background-modal'>
      <div className='address-container'>
          <div className='address-heading'>
            <h5>Add New Address</h5>
            <p onClick={closeModal} style={{cursor: 'pointer'}}>X</p>
          </div>
          <hr />
          <form className='formDetails'>
            <div className='address-type'>
              <span>Address Type : </span>
              <input type='radio' value='home' checked={addresstype === 'home'} onChange={() => setAddressType('home')} /> 
              <label>HOME</label>
              <input type='radio' value='office' checked={addresstype === 'office'} onChange={() => setAddressType('office')} /> 
              <label>OFFICE</label>
            </div>
            <div className='name-lastname address-input'>
                <input type='text' value={firstName} placeholder='fitst name' required onChange={(e) => setFirstName(e.target.value)} />
                <input type='text' value={lastName} placeholder='last name' required onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className='house-name address-input'>
              <input type='text' placeholder='HouseNo., BuildingName *' value={houseName} required onChange={(e) => setHouseName(e.target.value)} />
            </div>
            <div className='street-name address-input'>
               <input type='text' placeholder='Street Name, Area*' value={street} required onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className='landmark address-input' address-input>  
              <input type='text' placeholder='Landmark' value={landmark} required onChange={(e) => setLandmark(e.target.value)} />
            </div>
            <div className='code-city address-input'>
              <input type='number' placeholder='Postal Code*' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}/>
              <input type='text' placeholder='City / District*' value={city} required onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className='countary-state address-input'>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                {countryArray.map((country) => 
                  <option value={country}>{country}</option>
                )}  
              </select>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                  {stateArray.map((state) => 
                    <option value={state}>{state}</option>
                  )}
              </select>
            </div>
            <div className='form-buttons'>
              <Button className='form-cancel' text='Cancel' onClick={closeModal}/>
              <Button className='form-save' text='Save'  onClick={handleAddressSend}  />
            </div>
          </form>

      </div>
    </div>
    
    </>
  )
}
