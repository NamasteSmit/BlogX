import prisma from "@/lib/db"
import ArticleDetailPage from "@/components/Article/ArticleDetailPage"

export default async function SingleArticlePage({params}:{
    params : {
        id : string
    }
}){
    const id = (await params).id
     
    const article = await prisma.article.findUnique({
        where : {
            id : id
        },
        include:{
            comments : true,
            author : {
                select : {
                    name : true,
                    email : true,
                    imageUrl : true
                }
            }
        }
    })

    if(!article){
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-black">Article not found</p>
            </div>
        )
    }

    return (
        <ArticleDetailPage article={article} id={id}/>
    )
}