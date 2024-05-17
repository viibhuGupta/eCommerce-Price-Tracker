"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const HeroCarousel = () => {
    const heroCarouselImages = [
        { src : '/assets/images/hero-1.svg' , alt : "smartwatch"},
        { src : '/assets/images/hero-2.svg' , alt : "bag"},
        { src : '/assets/images/hero-3.svg' , alt : "lamp"},
        { src : '/assets/images/hero-4.svg' , alt : "air fryer"},
        { src : '/assets/images/hero-5.svg' , alt : "chair"},

        
    ]
  return (
    <>
    <div className="">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false} 
      interval={2000}
      showArrows={false}
      showStatus={false}
      >
        {heroCarouselImages.map((images) => (
            <Image
            src={images.src}
            key={images.alt}
            alt={images.alt}
            width={200}
            height={200} 
            />
        ))}
      </Carousel>
    </div>
    </>
  );
};

export default HeroCarousel;
