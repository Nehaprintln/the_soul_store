import React from 'react'
import Header from '../Header/Header'
import MenSelectCategories from './MenSelectCategories'
import { MenImageSlied } from './MenImageSlied';
// import { Categories }  from './Categories';
import { BestDeal } from './BestDeal';
// import Categories from './Categories';
import ShowCategaries from '../ShowCategaries/ShowCategaries';
import Carousel from '../CommonLayout/LatestCarousel/LatestCarousel.jsx';
import { latestCollectionMen } from '../CommonLayout/LatestCarousel/latestCollection.js';
import Heading from '../CommonLayout/Heading/Heading.jsx';
import TopSelling from '../CommonLayout/TopSellingCarousel/TopSellingCarousel.jsx'
import { topSellingMen } from '../CommonLayout/TopSellingCarousel/topSelling'
import MemberShipImg from '../CommonLayout/MemberShipImg/MemberShipImg.jsx'
export default function Men() {
  return (
    <div>
        <Header />
        <MenSelectCategories />
        <MenImageSlied />
        <Heading heading='CATEGORIES'/>
        <ShowCategaries />
        <Heading heading='LATEST COLLECTIONS'/>
        <Carousel latestCollection={latestCollectionMen} />
        <Heading heading={'TOP SELLING'}/>
        <TopSelling topSelling={topSellingMen} />
        <Heading heading='MEMBERSHIP' />
        <MemberShipImg />
    </div>
  )
}