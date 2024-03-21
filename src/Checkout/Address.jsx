import React, { useState } from 'react'
import './address.css';
import Button from '../CommonLayout/Button/Button'
import validationForm from './validationForm';

export default function Address(props) {
  const {closeModal, sendAddressFunc} = props;
  const [addresstype, setAddressType] = useState('home');
  const countryArray = ['Select Country','India', 'USA', 'UK'];
  const stateArray = ['Select State','Arunachal Pradesh', 'Bihar', 'Chandigarh', 'delhi', 'Goa', 'Haryana', 'Jammu and Kashmir', 'Kerela', 'Maharashtra', 'Uttar Pradesh']
  
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    houseName: '',
    street: '',
    landmark: '',
    postalCode: '',
    city: '',
    country: '',
    state: ''
  });

  const [errors, setErrors] = useState({});
  console.log('Error.length==> ',errors);

  const handleInput = (event) => {
    const newObj = {...formValue, [event.target.name]: event.target.value}
    setFormValue(newObj);
  }

  const handleAddressSend = (event) => {
    event.preventDefault();
    console.log('ADDRESS pas formValue ***>',  formValue)
    const validetedForm = validationForm(formValue);
    
    console.log('errors object =*>', errors);
    console.log('errors length**>', Object.keys(errors).length);
    
    if (Object.keys(validetedForm).length === 0) {
      const newAddress = JSON.stringify(formValue);
      const userRegister = localStorage.getItem("authToken");
      console.log('AuthToken', userRegister)
      const userAddress = JSON.parse(localStorage.getItem("userAddress")) || {};
      userAddress[userRegister] = newAddress;
      localStorage.setItem("userAddress", JSON.stringify(userAddress));

      sendAddressFunc(newAddress);
      closeModal();
    }
    setErrors(validetedForm);
    // event.preventDefault();
    // setErrors(ValidationForm(formValue));

    // if(Object.keys(errors).length === 0){
    //   const newAddress = JSON.stringify(formValue);
    //   localStorage.setItem("userAddress", newAddress);
    //   sendAddressFunc(newAddress);
    //   closeModal();
    // }
        
  };

  
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
                <input type='text' name="firstName" placeholder='first name' required onChange={handleInput} />
                <input type='text' name="lastName" placeholder='last name' required onChange={handleInput} />
                {errors.firstName && <span style={{ marginRight: '20px'}}>{errors.firstName}</span>}
                {errors.lastName && <span >{errors.lastName}</span>}

            </div>
            <div className='house-name address-input'>
              <input type='text' placeholder='HouseNo., BuildingName *' name="houseName"  onChange={handleInput} />
              {errors.houseName && <span>{errors.houseName}</span>}

            </div>
            <div className='street-name address-input'>
               <input type='text' placeholder='Street Name, Area*' name="street"  onChange={handleInput} />
              {errors.street && <span>{errors.street}</span>}

            </div>
            <div className='landmark address-input' address-input>  
              <input type='text' placeholder='Landmark' name="landmark"  onChange={handleInput} />
              {errors.landmark && <span>{errors.landmark}</span>}

            </div>
            <div className='code-city address-input'>
              <input type='number' placeholder='Postal Code*' name="postalCode"  onChange={handleInput}/>
              <input type='text' placeholder='City / District*' name="city"  onChange={handleInput} />
              {errors.postalCode && <span>{errors.postalCode}</span>}
              {errors.city && <span >{errors.city}</span>}

            </div>
            <div className='countary-state address-input'>
              <select name="state" onChange={handleInput}>
                  {stateArray.map((state) => 
                    <option value={state}>{state}</option>
                  )}
              </select>
              <select name="country" onChange={handleInput}>
                {countryArray.map((country) => 
                  <option value={country}>{country}</option>
                )}  
              </select>
              
              {errors.country && <span >{errors.country}</span>}
              {errors.state && <span >{errors.state}</span>}

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
