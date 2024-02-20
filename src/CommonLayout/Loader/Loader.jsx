import React from 'react'
import './Loader.css';
import { RotatingLines } from "react-loader-spinner";

export default function Loader(props) {
    let {className} =props
  return (
    <div className={className}>
           <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
    </div>
 
  )
}
