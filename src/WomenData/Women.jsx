import React from 'react'
import Header from '../Header/Header'
import WomenSelectCategories from './WomenSelectCategories'
import { WomenImageSlied } from './WomenImageSlied'
import WomenShowCategaries from './WomenShowCategaries'
import Heading from '../CommonLayout/Heading/Heading'
import Carousel from '../CommonLayout/LatestCarousel/LatestCarousel'
import { latestCollectionWomen } from '../CommonLayout/LatestCarousel/latestCollection'
import TopSelling from '../CommonLayout/TopSellingCarousel/TopSellingCarousel.jsx'
import { topSellingWomen } from '../CommonLayout/TopSellingCarousel/topSelling'
import MemberShipImg from '../CommonLayout/MemberShipImg/MemberShipImg.jsx'

export default function Women() {
  return (
    <div>
        <Header />
        <WomenSelectCategories />
        <WomenImageSlied />
        <Heading heading='CATEGORIES' />
        <WomenShowCategaries />
        <Heading heading='LATEST COLLECTIONS' />
        <Carousel latestCollection={latestCollectionWomen}/>
        <Heading heading={'TOP SELLING'}/>
        <TopSelling topSelling={topSellingWomen} />
        <Heading heading='MEMBERSHIP' />
        <MemberShipImg />
    </div>
  )
}
