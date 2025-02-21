import React from 'react'

const HeroSection = () => {
  return (
    <div className='h-screen items-center  pt-20 flex justify-center md:pt-40'>
    <div className=' h-fit flex flex-col space-y-4 justify-center flex-wrap items-center mt-10'>
    <h1 className="text-5xl text-center md:text-7xl flex flex-col items-center font-bold bg-gradient-to-b from-gray-100 to-gray-400 bg-clip-text text-transparent">
      <span>Your words have power. </span> <span>Make an impact with every post.</span>
     </h1>
     <p className="text-lg md:text-xl text-gray-400 mx-auto max-w-[450px] md:max-w-[600px] text-center ">
     Share your thoughts, inspire the world. A space where every story, idea, and insight finds its voice.
     </p>
     <div className='flex justify-center items-center gap-3'>
      <button className='bg-[#00C853] px-8 md:px-10 py-2 outline-none rounded-md font-medium text-black flex items-center justify-center gap-2 hover:-translate-y-1 duration-150'><span>Start Reading</span><span className='text-2xl'><i className="ri-arrow-right-line"></i></span></button>
      <button className='px-8 md:px-10 py-2 outline-none rounded-md font-medium text-white shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 hover:-translate-y-1 duration-150'><span>Explore topics</span><span className='text-2xl'><i className="ri-search-line"></i></span></button>
     </div>
    </div>
</div>
  )
}

export default HeroSection
