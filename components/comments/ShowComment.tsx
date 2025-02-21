import React from 'react'
import prisma from '@/lib/db'
const ShowComment = async({id}:{id :string}) => {
    const comments = await prisma.comment.findMany({
        where : {
            articleId : id
        },
        orderBy : {
            createdAt : "desc"
        },
        include : {
            user : {
                select : {
                    name : true,
                    imageUrl : true
                }
            }
        }
    })
    console.log("Successfully fetched comments===>",comments)
   
  return (
    
    
    <div className="min-h-screen w-full flex flex-col space-y-10 mt-10 px-12 border-l py-2">
   
    {
        comments.map((comment)=>{
            const createdAt = new Date(comment.createdAt);
            const now = new Date();
            // Convert to local timezone
           const minutesAgo = Math.floor((now.getTime() - createdAt.getTime()) / 60000); // 1 min == 60000 miliseconds
            return (
                <div key={comment.id} className="">
                <div className="flex items-center gap-3 text-gray-400">
                   <span className="w-8 h-8 rounded-full text-lg flex justify-center items-center bg-zinc-800 text-white">{comment.user.name.charAt(0)}</span>
                   <h3>{comment.user.name}</h3>
                   <p>{minutesAgo} min ago</p>
                </div>
                <div className="ml-4 mt-1 px-6 border-l border-zinc-950">
                   <p className="py-1 text-lg text-black">{comment.content}</p>
                </div>
            </div>
            )
        })
    }
     </div>
  )
}

export default ShowComment
