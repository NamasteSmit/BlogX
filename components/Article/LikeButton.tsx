"use client"
import React, { useOptimistic, useState} from 'react'
import { LikeDisLikeToggle } from '@/actions/like-dislike'
import { Like } from '@prisma/client'
interface LikeProps {
  id : string,
  likes : Like[],
  isliked : boolean  // true if user has liked the article, false otherwise
 
}

const LikeButton = ({id , likes , isliked} : LikeProps) => {
  console.log(id , likes , isliked)
  //reacl time UI update
  const [like, setLike] = useOptimistic(likes.length);
  const [isLiked, setIsLiked] = useOptimistic(isliked)
  const [loading , setLoading] = useState(false);


  const handleLike = async()=>{
    setLike(isliked ? like - 1 : like +  1)
    setLoading(true)
    setIsLiked(!isliked)
     const response =  await LikeDisLikeToggle({articleId:id})
     console.log(response)
     setLoading(false)
  }
  
  return (
    <div className="flex mt-4 gap-4 text-black">
        <div className='flex items-center'>
       <button onClick={handleLike} disabled={loading}  className={`w-10 h-10 rounded-full outline-none  hover:bg-red-100 duration-300 hover:text-red-600 border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex justify-center items-center gap-2`}>
       {isLiked ? <i className="ri-heart-fill text-2xl"></i> : <i className={`ri-heart-line text-2xl`}></i>}
       </button>
       <span className='text-lg'>{like > 0 ? like : 0}</span>
       </div>
       <button className="w-10 h-10 rounded-full  outline-none   hover:bg-purple-100 duration-300 hover:text-purple-800 border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex justify-center items-center gap-2"><i className="ri-bookmark-line text-2xl"></i></button>
    </div>
  )
}

export default LikeButton
