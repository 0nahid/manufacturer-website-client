import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../Shared/Footer'
import Loading from '../Shared/Loading'
import NewsLetter from '../Shared/NewsLetter'
import Statics from '../Shared/Statics'
import Steps from '../Shared/Steps'
import HomeShop from '../Shop/HomeShop'
import Banner from './Banner/Banner'
import FeatureMust from './FeatureMust/FeatureMust'
import Features from './FeaturePart/Features'
import Hero from './Hero/Hero'

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {
        loading ? <Loading /> : (
          <>
            <Helmet>
              <title>Home - Car Parts</title>
              <meta name="description" content="Helmet application" />
            </Helmet>
            <Banner />
            <div className="container mx-auto">
              <Hero/>
              <Features />
              <HomeShop />
              <FeatureMust />
              <Statics />
            </div>
            <Steps />
            <NewsLetter />
            <Footer />
          </>
        )
      }
    </>
  )
}
