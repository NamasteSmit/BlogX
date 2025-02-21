// mode insensitive means  it will find irrespective of capital letters or small letters
import prisma from "../db"
export async function FetchArticleByQuery(searchText : string , skip:number ,take:number){

    const [articles , total] = await prisma.$transaction([
        prisma.article.findMany({
            where : {
                OR : [
                    { title: { contains : searchText ,mode:"insensitive" }},
                    { content: { contains : searchText,mode:"insensitive" }},
                    { author: { name: { contains : searchText ,mode:"insensitive"}}}
                ]
            },
            orderBy : {
                createdAt : "desc"
            },
            include : {
                author : {
                    select : {
                        name : true,
                        imageUrl : true,
                        email : true
                    }
                }
            },
            skip : skip,
            take : take
        }),
        prisma.article.count({
            where : {
                OR : [
                    { title: { contains : searchText ,mode:"insensitive" }},
                    { content: { contains : searchText,mode:"insensitive" }},
                    { author: { name: { contains : searchText ,mode:"insensitive"}}}
                ]
            }
        })
    ])

    // const articles = await prisma.article.findMany({
    //     where : {
    //         OR : [
    //             { title: { contains : searchText ,mode:"insensitive" }},
    //             { content: { contains : searchText,mode:"insensitive" }},
    //             { author: { name: { contains : searchText ,mode:"insensitive"}}}
    //         ]
    //     },
    //     orderBy : {
    //         createdAt : "desc"
    //     },
    //     include : {
    //         author : {
    //             select : {
    //                 name : true,
    //                 imageUrl : true,
    //                 email : true
    //             }
    //         }
    //     },
    //     skip : skip,
    //     take : take
    // })
    return {articles , total};
}