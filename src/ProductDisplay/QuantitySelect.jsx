import React from 'react'
import './ProductDisplay.css';
export default function QuantitySelect(props) {
    const {className, text, selectValue, handleQuantityChange } = props;

  return (
    <div
    className={className}
  >
    <span style={{ color: "#58595b" }}>{text}</span>
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
  )
}
