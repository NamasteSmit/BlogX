"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function DeleteArticleAction({articleId}:{articleId:string}){
    console.log(articleId);
    await prisma.article.delete({
        where : {
            id : articleId
        }
    })
 
    revalidatePath("/dashboard");
    return{
        success : true
    }
}