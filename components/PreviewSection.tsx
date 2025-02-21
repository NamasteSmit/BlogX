import React from 'react'
import FilterComponents from './FilterComponent'
import Footer from './Footer'

const PreviewSection = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
        <div className="relative">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-300 to-blue-300  opacity-50 shadow-[0px_10px_30px_7px_rgba(255,255,255,0.5)]"></div>
        </div>
        <div className='flex flex-col justify-center items-center space-y-2'>
            <h1 className='text-5xl mt-8 font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400'>
                Featrued Articles
             </h1>
             <p className='text-md text-center'>
                Discover out most popular and trending articles
             </p>
         </div>
         <div className=''>
            <FilterComponents/>
         </div>
         <div>
            <Footer/>
         </div>
    </div>
  )
}

export default PreviewSection
