import Link from 'next/link'
import React from 'react'

const SideBar = () => {  return (
    <div className=' w-1/4 md:w-1/6 border flex flex-col  px-2 md:px-4 space-y-3'>
       <div>
            <Link href={"/"}>=<h1 className='text-lg cursor-pointer md:text-2xl font-bold text-black flex  md:px-4 items-center h-12'>Code Craft</h1></Link>
       </div>
       <div className='w-full h-[1px] bg-zinc-900'></div>
       <div className='h-full'>
         <ul className='w-full h-full flex flex-col gap-4 p-2 px-2 text-black'>
           <Link href={"/dashboard"}><li className=' px-2 py-1 flex items-center gap-1 hover:bg-zinc-200 duration-200'><i className="ri-layout-4-fill text-2xl md:text-base"></i><span className='hidden md:block'>Overview</span></li></Link>
           <Link href={`/dashboard/articles/create`}><li className=' px-2 py-1 flex items-center gap-1 hover:bg-zinc-200 duration-200'><i className="ri-article-line text-2xl md:text-base "></i><span className='hidden md:block'>Articles</span></li></Link>
           <Link href={""}><li className=' px-2 py-1 flex items-center gap-1 hover:bg-zinc-200 duration-200'><i className="ri-chat-3-line  text-2xl md:text-base"></i><span className='hidden md:block'>Comments</span></li></Link>
           <Link href={""}><li className=' px-2 py-1 flex items-center gap-1 hover:bg-zinc-200 duration-200'><i className="ri-bar-chart-line  text-2xl md:text-base"></i><span className='hidden md:block'>Analytics</span></li></Link>
           <Link href={""}><li className=' px-2 py-1 flex items-center gap-1 hover:bg-zinc-200 duration-200'><i className="ri-settings-2-line  text-2xl md:text-base"></i><span className='hidden md:block'>Setting</span></li></Link>
         </ul>
       </div>
    </div>
  )
}

export default SideBar
