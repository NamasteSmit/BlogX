"use client"
import React, { useEffect, useState } from 'react'
import FeatureCard from './FeatureCard'
import { GetAllArticles } from '@/actions/get-article'
import type { Article } from '@prisma/client'
import Link from 'next/link'
const FilterComponents = () => {
  const buttonTitle = ["All" , "Admin" , "Agency" , "App" , "Blockchain" , "Blog"]
  const [activeIndex , setActiveIndex] = useState<number | null>(0);
  const [articles , setArticles] = useState<Article[]>([]);

   const getArticles = async()=>{
    console.log("ffljfwofjw")
    const response = await GetAllArticles();
    console.log("----",response);
    setArticles(response);
    }
   
   useEffect(()=>{ 
      getArticles();
   },[])

  return (
    <div className='w-full min-h-screen px-10 flex flex-col gap-10'>
    <div className='flex gap-3 justify-center mt-12 flex-wrap md:flex-nowrap'>
    {
      buttonTitle.map((title , index) => (
          <button key={index} onClick={()=>setActiveIndex(index)} className={`w-[120px] px-4 py-2 rounded-md shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] hover:bg-zinc-900 hover:text-purple-600 transition-all duration-200 flex items-center justify-center ${activeIndex==index ? "bg-zinc-900 text-purple-600" : "bg-none"}`}>
              {title}
          </button>
      ))
  }
  </div>
  <div className='flex flex-wrap  gap-6 md:px-4'>
  {
    articles.slice(0,3).map((article)=>{
      return <FeatureCard key={article.id} article={article}/>  // replace FeatureCard with actual component name and pass article data to it.  // Assuming FeatureCard is a custom component created for displaying articles.  // Replace 'article' with actual property name in your database schema.  // Replace 'id' with actual primary key in your database schema.  // Replace 'FeatureCard' with actual component name.  // Replace 'articles' with actual state name in your component.  // Replace 'article.id' with actual property name in your database schema.   // Replace 'article.title' with actual property name in your database schema.   // Replace 'article.description' with actual property name in your database schema.   // Replace 'article.author' with actual property name in your database schema.   // Replace 'article.publishedAt' with actual property name in your database schema.   // Replace 'article.coverImage' with actual property
    })
  }
  </div>
  <div className='w-full flex justify-center items-center mb-4'>
  <Link href={"/articles"}><button className='bg-[#00C853] px-8 md:px-10 py-2 outline-none rounded-md font-medium text-black flex items-center justify-center gap-2 hover:-translate-y-1 duration-150'><span>Browse All</span><span className='text-2xl'><i className="ri-arrow-right-line"></i></span></button></Link> 
  </div>
  </div>
  )
}

export default FilterComponents
