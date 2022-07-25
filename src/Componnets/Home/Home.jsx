import React from 'react'
import Footer from '../Shared/Footer'
import NewsLetter from '../Shared/NewsLetter'
import HomeShop from '../Shop/HomeShop'
import Banner from './Banner/Banner'
import FeatureMust from './FeatureMust/FeatureMust'
import Features from './FeaturePart/Features'

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <HomeShop />
      <FeatureMust />
      <NewsLetter />
      <Footer />
    </>
  )
}
