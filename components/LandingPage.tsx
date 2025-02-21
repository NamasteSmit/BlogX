import React from 'react'
import HeroSection from "@/components/HeroSection";
import PreviewSection from './PreviewSection';
const LandingPage = () => {
  return (
      <div className='min-h-screen w-full'>
        <HeroSection/>
        <PreviewSection/>
      </div>
  )
}

export default LandingPage
