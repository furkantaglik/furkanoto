"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const banners = [
  {
    image: 'https://www.mercedes-benz.com.tr/content/turkey/tr/passengercars/_jcr_content/root/responsivegrid/simple_stage_1564354.component.damq5.3401369272805.jpg/mercedes-benz-e-class-w214-stage-3840x1707-02-2023.jpg',
    bannerTitle: 'Yeni E Serisi',
    bannerSlogan: 'Senin Yasıman !',
  },
  {
    image: 'https://www.mercedes-benz.com.tr/content/turkey/tr/passengercars/_jcr_content/root/responsivegrid/simple_stage_1564354.component.damq5.3375582587408.jpg/mercedes-benz-glc-coupe-c254-stage-finance-leasing-3840x1707-04-2023.jpg',
    bannerTitle: 'Yeni Glc Coupe',
    bannerSlogan: 'Tutkuyla Tasarlandı',
  },
  {
    image: 'https://www.mbusa.com/content/dam/mb-nafta/us/mercedes-benz-charging-network/E-STAR-HERO.jpg',
    bannerTitle: 'Efsanelerden',
    bannerSlogan: 'Sende bir Göz At',
  },
];

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval); 

  }, [currentBannerIndex]);

  const currentBanner = banners[currentBannerIndex];

  return (
    <section className="max-w-screen-2xl mx-auto relative ">
      <img className="w-full h-full" src={currentBanner.image} alt="" />
      <div className="absolute md:top-40 top-5 md:left-10 left-5 text-white font-bold z-10">
        <h1 className="md:text-5xl text-lg font-serif md:mb-10 text-blue-500">{currentBanner.bannerTitle}</h1>
        <p className="md:text-lg text-sm text-neutral-300 md:mb-16 mb-8">{currentBanner.bannerSlogan}</p>
        <Link href="/test" className="bg-blue-600 hover:bg-blue-700 md:px-10 px-5 py-1">
          Keşfedin
        </Link>
      </div>
      <div className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute left-0 top-0 w-2/4 h-full bg-gradient-to-r from-black to-transparent"></div>
    </section>
  );
};

export default Banner;
