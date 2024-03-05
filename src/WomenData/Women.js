import React from 'react'
import Header from '../Header/Header'
import WomenSelectCategories from './WomenSelectCategories'
import { WomenImageSlied } from './WomenImageSlied'
import WomenShowCategaries from './WomenShowCategaries'
export default function Women() {
  return (
    <div>
        <Header />
        <WomenSelectCategories />
        <WomenImageSlied />
        <WomenShowCategaries />
        {/* <div style={{height: '1000px', background: 'grey'}}>

        </div> */}
    </div>
  )
}
