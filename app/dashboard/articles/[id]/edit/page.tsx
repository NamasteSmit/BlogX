import EditArticleComponent from "@/components/Dashboard/EditArticle";
import prisma from "@/lib/db";
export default async function EditArticle({params}:{
    params :{
        id : string
    }
}){
    const id = (await params).id;
    const article = await prisma.article.findUnique({
        where : {
            id : id
        }
    })
    console.log("Article componmentn===>",article)

    if(!article){
        return <p className="text-center text-lg text-black">No article Found</p>
    }
    return (
         <EditArticleComponent article={article}/>
    )
}