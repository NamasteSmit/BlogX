"use server"
import prisma from "@/lib/db";

export async function GetAllArticles(){
    console.log("Getting all articles.....")
    const allArticle =  await prisma.article.findMany({
        orderBy : {
            createdAt : "desc"
        },
        include:{
            author : {
                select : {
                    name : true,
                    imageUrl : true
                }
            }
        }
    })
    console.log("fetched all articles",allArticle);
    return allArticle;
}