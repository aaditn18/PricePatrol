import React from 'react'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import HeroCarousel from '@/components/HeroCarousel'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home = async () => {
  const allProducts = await getAllProducts(); 
  return (
    <>
      <section className='px-6 md:px-20 py-40'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt = "arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className='head-text'>
            Introducing Your Price Watchdog: 
            Price<span className='text-yellow-700'>Patrol</span>
            </h1>
            
            <p className='mt-6'>
              Want to track prices? Stick to your budget? Recieve product updates? You save your money, we save your time!!!
            </p>
            <SearchBar/>
          </div>
          <HeroCarousel />
          <Image 
            src = "assets/icons/hand-drawn-arrow.svg"
            alt = "arrow"
            width = {175}
            height = {175}
            className="max-xl:hidden absolute left-[50%] bottom-0 z-0"
          />
        </div>
      </section>

      <section className='trending-section'>
        <h2 className='section-text'>
          Trending
        </h2>

        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map((product)=> (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home