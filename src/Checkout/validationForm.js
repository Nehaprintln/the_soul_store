import React from 'react'

export default function validationForm(formValue) {
    console.log('formValue Firstna ==> ',formValue);
    const errors = {};
    
    if(formValue.firstName === ''){
      errors.firstName = "First name required!";
    }
    if(formValue.lastName === ''){
      errors.lastName = "Last name required!";
    }
    if(formValue.houseName === ''){
      errors.houseName = "House name required!";
    }
    if(formValue.street === ''){
      errors.street = "Street name required!";
    }
    if(formValue.landmark === ''){
      errors.landmark = "Landmark name required!";
    }
    if(formValue.postalCode === ''){
      errors.postalCode = "Postal code  required!";
    }
    if(formValue.city === ''){
      errors.city = "City name required!";
    }
    if(formValue.country === ''){
      errors.country = "Country name required!";
    }
    if(formValue.state === ''){
      errors.state = "State name required!";
    }
    
 
    return errors;
}
