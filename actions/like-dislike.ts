"use server"
import { getServerSession } from "next-auth"
import { authOption } from "@/lib/auth"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache";
export async function LikeDisLikeToggle({articleId}:{articleId : string}){
 
     const session = await getServerSession(authOption);
     console.log("session", session)
     
     if(!session?.user){
        return {
            success : false,
            errors : ["You must be logged in"]
        }
     }

     const user = await prisma.user.findUnique({
        where : {
            email : session.user.email as string
        }
     })

     console.log("backend user" , user)

     if(!user){
        return {
            success : false,
            errors : ["User not found"]
        }
     }

     const existingLike = await prisma.like.findFirst({
        where : {
            articleId : articleId,
            userId : user.id
        }
     })

     if(existingLike){
         await prisma.like.delete({
            where : {
                id : existingLike.id
            }
         })
     }else{
        await prisma.like.create({
            data:{
                articleId : articleId,
                userId : user.id
            }
        })
     }
    
    revalidatePath(`/articles/${articleId}`)
    return{
        success : true
    } 
}