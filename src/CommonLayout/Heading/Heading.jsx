import React from 'react'
import './heading.css';
export default function Heading({heading}) {
  return (
    <div className='heading'>
        <h3 style={{fontWeight: '600'}}>{heading}</h3>
    </div>
  )
}
