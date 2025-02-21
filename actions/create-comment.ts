"use server"
import prisma from "@/lib/db"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOption } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const CommentSchema = z.object({
    comment : z.string().min(1 , "Comment should be minimum of 2 characters")
})

interface CommentProp {
    comment : string,
    articleId : string
}

type ValiadionError = {
    errors :{
        comment?: string[]
        formErrors?: string[]
    }
}

export async function CreateComment({comment , articleId}:CommentProp):Promise<ValiadionError>{
    console.log('creating comment-----')
    const validateSchema = CommentSchema.safeParse({comment});
    if(!validateSchema.success){
        return {
            errors : validateSchema.error.flatten().fieldErrors
        }
    }

    const session = await getServerSession(authOption);

    if(!session?.user){
        return {
            errors : {
                formErrors : ["You must be logged in"]
            }
        }
    }

    const existingUser = await prisma.user.findUnique({
        where : {
            email : session.user.email as string
        }
    })

    if(!existingUser){
        return {
            errors : {
                formErrors : ["User not found"]
            }
        }
    }

    try{
        await prisma.comment.create({
            data:{
                content : comment,
                userId : existingUser.id,
                articleId : articleId
            }
        })

    }catch(err){
        console.error("Error creating comment",err)
        return {
            errors : {
                formErrors : ["Failed to create comment"]
            }
        }
    }

    console.log("crated comment------")

    revalidatePath(`/articles/${articleId}`)
    return {
        errors : {}
    }

}