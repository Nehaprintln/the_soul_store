import React from 'react'
import Header from '../Header/Header'
import WomenSelectCategories from './WomenSelectCategories'
import { WomenImageSlied } from './WomenImageSlied'
export default function Women() {
  return (
    <div>
        <Header />
        <WomenSelectCategories />
        <WomenImageSlied />
        {/* <div style={{height: '1000px', background: 'grey'}}>

        </div> */}
    </div>
  )
}
