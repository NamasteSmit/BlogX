import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

interface ArticleProps{
  article :
   {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  }
}

const FeatureCard = ({article}:ArticleProps) => {
  return (
    <div className='w-[450px]  rounded-md border-zinc-700 shadow-[0_0_5px_rgba(255,255,255,0.5)] flex flex-col justify-between  space-y-4 p-4 mb-2'>
      <div className='w-full  h-56'>
        <Image src={article.imageUrl as string} className='w-full h-full object-cover shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] border border-zinc-600 transition-transform duration-300 hover:scale-95 rounded' alt='' width={200} height={200}/>
      </div>
      <div className=''>        
           <span className='text-lg px-6 border rounded-lg border-purple-500 
          shadow-[0_0_10px_rgba(148,0,211,0.7)] py-1'><i className="ri-reactjs-fill  text-xl mr-1"></i>{article.category}</span>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold cursor-pointer hover:text-blue-600 duration-300'>{article.title}</h1>
       <section dangerouslySetInnerHTML={{__html:article.content.substring(0,50)}}/>
      </div>
      <div className='w-full border border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] h-12'>
       <Link href={`/articles/${article.id}`}><button className='w-1/2 h-full border-r border-zinc-800 hover:bg-zinc-900 transition-all duration-200 hover:text-purple-600'><i className="ri-eye-line mr-1 text-xl"></i>Preview</button></Link>
        <button className='w-1/2 h-full hover:bg-zinc-900 transition-all duration-200 hover:text-purple-600' ><i className="ri-arrow-down-line mr-1 text-xl"></i>Download</button>
      </div>
    </div>
  )
}

export default FeatureCard
