import Image from 'next/image'
import React from 'react'
import  type { Prisma } from '@prisma/client'

type AllArticlePageProp = {
    articles: Prisma.ArticleGetPayload<{
        include : {
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

const AllArticlePage : React.FC<AllArticlePageProp> = async({articles}) => {

 
    if(articles.length<=0){
        return <div>No articles found</div>
    }

  return (
    <div className='w-full h-fit  flex flex-wrap gap-4 px-10 md:px-8 py-4 container mx-auto'>
          {
            articles.map((article)=>{
                return <div key={article.id} className='w-[350px]  p-4 border flex flex-col space-y-5 rounded-lg'>
                <div className='w-full rounded-lg'>
                   <Image className='object-cover w-full rounded-lg' width={120} height={120} src={article.imageUrl as string} alt=''/> 
                </div>
                <div className='w-full'>
                    <h1 className='text-2xl text-black font-bold'>{article.title}</h1>
                </div>
                <div>
                    <section className='text-black' dangerouslySetInnerHTML={{__html:article.content.substring(0,50)}}/>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                   {article.author.imageUrl ? <div className='w-10 h-10 rounded-full'><Image className='object-cover rounded-full w-full h-full' alt='' width={24} height={24} src={article.author.imageUrl as string} /></div>: <span className="w-8 h-8 rounded-full text-xl flex justify-center items-center bg-zinc-800 text-white">{article.author.name?.charAt(0)}</span>
                    }
                        <p className='text-black'>{article.author.name}</p>
                    </div>
    
                    <div className='text-black'>{article.createdAt.toDateString()}</div>
                </div>
              </div>
            })
          }
    </div>
  )
}

export default AllArticlePage
