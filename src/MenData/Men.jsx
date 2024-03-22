import React from 'react'
import '../ResponsiveMedia/responsiveMediaQuery.css';
import Header from '../Header/Header.jsx'
import MenSelectCategories from './MenSelectCategories.js'
import { MenImageSlied } from './MenImageSlied.js';
// import { Categories }  from './Categories';
import { BestDeal } from './BestDeal.js';
// import Categories from './Categories';
import ShowCategaries from '../ShowCategaries/ShowCategaries.jsx';
import Carousel from '../CommonLayout/LatestCarousel/LatestCarousel.jsx';
import { latestCollectionMen } from '../CommonLayout/LatestCarousel/latestCollection.js';
import Heading from '../CommonLayout/Heading/Heading.jsx';
import TopSelling from '../CommonLayout/TopSellingCarousel/TopSellingCarousel.jsx'
import { topSellingMen } from '../CommonLayout/TopSellingCarousel/topSelling.js'
import MemberShipImg from '../CommonLayout/MemberShipImg/MemberShipImg.jsx'
export default function Men() {
  return (
    <div>
        {/* <Header /> */}
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