"use client"
import { Prisma } from '@prisma/client';
import Link from 'next/link'
import React, { useState } from 'react'
import { DeleteArticleAction } from '@/actions/delete-article';

  type RecentArticleProps = {
    articles : Prisma.ArticleGetPayload<{
      include : {
        comments : true,
        author :  {
          select : {
            name : true,
            email : true,
            imageUrl : true
          }
        }
      }
    }>[]
  }

const RecentArticles : React.FC<RecentArticleProps> = ({articles}) => {

  
  const [loading , setLoading] = useState(false);
   
  const handleArticleDelete = async(articleId:string)=>{
        setLoading(true)
        const response = await DeleteArticleAction({articleId})
        if(response.success)
          setLoading(false)
  }

  return (
    <div className='border h-fit py-4 md:px-10 mt-10 md:mt-16 flex flex-col rounded-lg'>
    
        <div className='flex justify-between items-center px-4 py-2 text-black'>
            <h1 className='text-lg font-bold'>Recent Articles</h1>
            <Link href={''}><span className="flex gap-1 after:content-[''] after:w-0 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-zinc-900  hover:after:w-full after:transition-all after:duration-300">View all <i className="ri-arrow-right-long-fill"></i></span></Link>
        </div>

        <div className='overflow-x-auto mt-4 '>
            <table className='min-w-full hidden md:table rounded-lg'>
                <thead>
                <tr className=" text-lg text-gray-600 font-normal border-b">
                     <th className="py-2 px-4">Title</th>
                     <th className="py-2 px-4">Status</th>
                     <th className="py-2 px-4">Comments</th>
                     <th className="py-2 px-4">Date</th>
                     <th className="py-2 px-4">Actions</th>
                 </tr>
                </thead>
                <tbody>
                    {
                      articles.map((item)=>{
                            return (
                                <tr key={item.id} className='border-b text-gray-700'>
                                    <td className='py-2 px-4'>{item.title}</td>
                                    <td className='py-2 px-4'><span className='border text-sm px-2 py-1 rounded-full bg-green-100 text-green-700'>published</span></td>
                                    <td className='py-2 px-4'>{item.comments.length}</td>
                                    <td className='py-2 px-4'>{item.createdAt.toDateString()}</td>
                                    <td className='py-2 px-4 space-x-4'>
                                    <Link href={`/dashboard/articles/${item.id}/edit`}><button className="text-blue-600 hover:underline bg-blue-100 rounded-full px-2 py-1">Edit</button></Link> 
                                    <button onClick={()=>handleArticleDelete(item.id)} className={`text-red-600 hover:underline bg-red-200 rounded-full px-2 py-1 ${loading ? "disabled cursor-not-allowed" :""}`}>{loading ? "deleteing..." : "Delete"}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        {/* Mobile View (Cards) */}
      <div className="md:hidden flex flex-col gap-4 text-black px-2">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-semibold text-lg">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.createdAt.toDateString()}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">published</span>
              <span className="text-gray-600 text-sm">{article.comments.length} comments</span>
            </div>
            <div className="flex gap-4 mt-3">
           <Link href={`/dashboard/articles/${article.id}/edit`}><button className="text-blue-600 hover:underline bg-blue-100 rounded px-2 py-1">Edit</button></Link> 
            <button onClick={()=>handleArticleDelete(article.id)} className="text-red-600 hover:underline bg-red-200 rounded px-2 py-1">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentArticles
