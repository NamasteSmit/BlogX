import React from 'react'
import RecentArticles from './RecentArticles'
import Link from 'next/link'
import prisma from '@/lib/db'

const BlogDashboard = async() => {
    const [articles , totalComments] = await Promise.all([
        prisma.article.findMany({
        orderBy : {
          createdAt : "desc"
        },
        include : {
          comments : true,
          author : {
            select : {
              name : true,
              email : true,
              imageUrl : true
            }
          }
        }
       }),

       prisma.comment.count()
    ])
  return (
    <div className='flex-1 w-full min-h-screen flex flex-col space-y-3'>
       <div className='w-full h-20 flex justify-between items-center px-2 md:px-8 mt-4 md:mt-6 '>
          <div>
              <h1 className='text-xl md:text-2xl font-bold text-black'>Blog Dashboard</h1>
              <p className='text-zinc-950 text-xs md:text-sm'>Manage your content and analytics</p>
          </div>
          <div>
            <Link href={"/dashboard/articles/create"}><button className='border rounded-md px-2 py-1 md:px-8 md:py-2 bg-zinc-900 text-white flex justify-center items-center gap-2 hover:text-purple-600 duration-300'><i className="ri-add-circle-line text-xl"></i><span className='hidden md:block'>New Article</span></button></Link>
          </div>
       </div>

       <div className='px-2 md:px-4 gap-6 flex flex-col md:flex-row'>
           <div className='md:w-1/3 border text-black p-8 flex flex-col gap-2 rounded-md'>
              <div className='flex items-center justify-between p2'>
                <h2 className=''>Total Articles</h2>
                <i className="ri-article-line text-2xl md:text-lg "></i>
              </div>
              <h2 className='text-2xl font-bold'>{articles.length}</h2>
              <p className='text-sm'>+5 from last month</p>
           </div>

           <div className='md:w-1/3 border text-black p-8 flex flex-col gap-2 rounded-md'>
              <div className='flex items-center justify-between p2'>
                <h2 className=''>Total Comments</h2>
                <i className="ri-chat-3-line  text-2xl md:text-lg"></i>
               </div>
              <h2 className='text-2xl font-bold'>{totalComments}</h2>
              <p className='text-sm'>12 awaiting moderation</p>
           </div>

           <div className='md:w-1/3 border text-black p-8 flex flex-col gap-2 rounded-md'>
              <div className='flex items-center justify-between p2'>
                <h2 className=''>Avg.Rating Time</h2>
                <i className="ri-bard-line text-2xl md:text-lg"></i>
              </div>
              <h2 className='text-2xl font-bold'>4.2</h2>
              <p className='text-sm'>+0.6 from last month</p>
           </div>
       </div>
        
        <div className='px-2 md:px-8 min-h-screen'>
          <RecentArticles articles={articles}/>
        </div>
    </div>
  )
}

export default BlogDashboard
