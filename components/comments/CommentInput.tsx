"use client"
import React, { useState } from 'react'
import { CreateComment } from '@/actions/create-comment'
import { useSession } from 'next-auth/react'
const CommentInput = ({id} : {id : string}) => {
        const [comment , setComment] = useState<string>("") 
        const [errors , setError] = useState<Record<string,string>[]>([]);
        const [loading , setLoading] = useState(false);
        const session = useSession();

        const handleCommentSubmit = async()=>{
            setError([])
            setLoading(true);
            const response = await CreateComment({comment , articleId:id})
              setError(response?.errors as Record<string,string>[]);
              setTimeout(()=>{
                setError([])
              },2500)
              setComment("");
              setLoading(false);
        }
  return (
    <div className="w-full flex gap-4 ">
        <span className="w-10 h-10 rounded-full text-xl flex justify-center items-center bg-zinc-800 text-white">{session.data?.user.name?.charAt(0)}</span>
        <div className="w-[60%] flex flex-col relative items-end gap-2">
        <input value={comment} onChange={(e)=>setComment(e.target.value)} className="w-full rounded-md text-black outline-none px-4 md:px-8 py-2 bg-transparent border" type="text" placeholder="Share your thoughts"/>
        {errors.comment && <p className='text-sm absolute left-2 top-1/2 text-red-600'>{errors.comment}</p>}
        <button onClick={handleCommentSubmit} className={`${loading ? "disabled cursor-not-allowed" : "" }  px-2 py-1 md:px-6 md:py-2 bg-blue-100 text-blue-700 outline-none border rounded-md hover:bg-zinc-100 duration-300 hover:text-purple-600 border-zinc-800 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] flex justify-center items-center gap-2`}><i className="ri-file-copy-line text-xl"></i>Add Thought</button>
        </div>
    </div>
  )
}

export default CommentInput
