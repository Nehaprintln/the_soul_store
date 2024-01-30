import React from 'react'
import Header from '../Header/Header'
import MenSelectCategories from './MenSelectCategories'
import { MenImageSlied } from './MenImageSlied';
// import { Categories }  from './Categories';
import { BestDeal } from './BestDeal';
// import Categories from './Categories';
import ShowCategaries from '../ShowCategaries/ShowCategaries';

export default function Men() {
  return (
    <div>
        <Header />
        <MenSelectCategories />
        <MenImageSlied />
        <ShowCategaries />
        {/* <Categories /> */}
        {/* <BestDeal /> */}
    </div>
  )
}
