import React from 'react'
import Image from "next/image"
import type { Like, Prisma } from '@prisma/client'
import Comment from '../comments/Comment'
import LikeButton from './LikeButton'
import { getServerSession } from 'next-auth'
import { authOption } from '@/lib/auth'

interface ArticleProps{
    article : Prisma.ArticleGetPayload<{
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
    }>
    id : string
}


const ArticleDetailPage : React.FC<ArticleProps> = async({article ,id}) => {
  
  const session = await getServerSession(authOption)
   
  const likes = await prisma?.like.findMany({
    where : {
      articleId : id
    }
  })
  const user = await prisma?.user.findUnique({
    where : {
       email : session?.user.email as string
    }
  })

  const isLiked = likes?.some(like => like.userId === user?.id)

  return (
    <div>
      <div className="min-h-screen w-full px-10 md:px-20">
                  <div className="w-full flex flex-col items-center mt-10 mb-5">
                   <div>
                      <h2 className="px-4 py-1 bg-blue-50 rounded-full text-blue-600 mb-5">{article.category}</h2>
                   </div>
      
                   <div className="text-3xl md:text-4xl text-black flex flex-wrap max-w-2xl text-center font-bold">
                      <h2>{article.title}</h2>
                   </div>
      
                   <div className="flex justify-center items-center mt-8 gap-2 min-w-fit py-1 text-black text-sm">
                      <div className="flex w-1/3 min-w-fit border-r pr-3 border-zinc-900  items-center gap-1 text-black">
                          <div className='w-8 h-8 rounded-full'>
                           {article.author.imageUrl ?
                            <Image className='object-cover rounded-full w-full h-full' alt='' width={24} height={24} src={article.author.imageUrl as string} />
                             :<span className="w-8 h-8 rounded-full text-xl flex justify-center items-center bg-zinc-800 text-white">{article.author.name.charAt(0)}</span>
                        }
                            </div>
                          <p>{article.author.name}</p>
                      </div>
                      <div className="w-1/3 border-r min-w-fit pr-3 border-zinc-900 flex justify-center items-center py-1">{article.createdAt.toDateString()}</div>
                      <div className="w-1/3 flex  min-w-fit pr-3 justify-center items-center">5 min read</div>
                   </div>
      
                   <div className="flex mt-8 gap-2 text-black">
                      <button className="px-6 py-2 outline-none border rounded-md hover:bg-zinc-100 duration-300 hover:text-purple-600 border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex justify-center items-center gap-2"><i className="ri-share-line text-xl"></i>Share</button>
                      <button className="px-6 py-2 outline-none border rounded-md hover:bg-zinc-100 duration-300 hover:text-purple-600 border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex justify-center items-center gap-2"><i className="ri-twitter-x-line text-xl"></i>Tweet</button>
                      <button className="px-6 py-2 outline-none border rounded-md hover:bg-zinc-100 duration-300 hover:text-purple-600 border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex justify-center items-center gap-2"><i className="ri-file-copy-line text-xl"></i>Copy</button>
                   </div>
                   </div>
      
                 <div className="w-full flex justify-center items-center mb-12">
                   <div className="max-w-2xl flex justify-center items-center h-[450px]">
                      <Image alt="" className="w-full h-full" width={120} height={120} src={article.imageUrl as string}/>
                   </div>
                   </div>
      
                    <section className="w-full mb-5 bg-gray-100 font-medium text-lg text-black  p-6 md:p-8 px-8 md:px-10" dangerouslySetInnerHTML={{__html:article.content}}/>
      
                    <LikeButton id={id} likes={likes as Like[]} isliked={isLiked as boolean}/>
      
                    <Comment id={id}/>
              </div>
    </div>
  )
}

export default ArticleDetailPage
