"use client" 
// requires user interactivity
import React from 'react'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, CarouselProps } from 'react-responsive-carousel';

const heroImages = [
    {imgUrl: "/assets/images/hero-1.svg", alt: "Smartwatch"},
    {imgUrl: "/assets/images/hero-2.svg", alt: "Bag"},
    {imgUrl: "/assets/images/hero-3.svg", alt: "Lamp"},
    {imgUrl: "/assets/images/hero-4.svg", alt: "Air Fryer"},
    {imgUrl: "/assets/images/hero-5.svg", alt: "Chair"}
]

const HeroCarousel = () => {
    return (
        <div className='hero-carousel'>
            <Carousel 
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={2000}
                showArrows={false}
                showStatus={false}
            >
                {heroImages.map((image) => (
                    <Image
                    src = {image.imgUrl}
                    alt = {image.alt}
                    width = {484}
                    height = {484}
                    className = "object-contain"
                    key = {image.alt}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default HeroCarousel