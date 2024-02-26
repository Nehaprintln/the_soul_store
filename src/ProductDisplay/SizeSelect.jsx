import React from 'react'
import './ProductDisplay.css';


export default function SizeSelect(props) {
const {className, productDetails, handleSizeChange,selectedSize} = props;

  return (
    <div className={className}>
    <ul style={{ marginLeft: "-35px" }}>
      {productDetails?.size.map((size) => (
        <li key={productDetails?._id}>
          <input
            type="radio"
            id={`size${size}`}
            name="size"
            value={size}
            onChange={handleSizeChange}
            checked={selectedSize === size}
          />
          <label
            style={{
              border:
                selectedSize === size
                  ? "2px solid #117a7a"
                  : "2px solid #b3b3b3",
            }}
          >
            {size}
          </label>
        </li>
      ))}
    </ul>
  </div>
  )
}
