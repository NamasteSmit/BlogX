import SearchBar from "@/components/Article/SearchBar"
import AllArticlePage from "@/components/Article/AllArticlePage"
import { Suspense } from "react";
import { FetchArticleByQuery } from "@/lib/query/fetch-article-by-query";
import Link from "next/link";

export default async function Articles({searchParams}:{
      searchParams : {
        search : string,
        page : string
      }
}){

    const searchText = (await searchParams).search || "";
    
    const ITEMS_PER_PAGE = 3
    const Page = (await searchParams).page;
    const currentPage = Number(Page) || 1
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    const take = ITEMS_PER_PAGE;

    const {articles , total} = await FetchArticleByQuery(searchText,skip,take)


      const totalPages = Math.ceil(total/ITEMS_PER_PAGE);

     
    return (
        <div className="min-h-screen w-full bg-background">
            <main className="container mx-auto px-4 py-12 sm:px-6 ">
               
                <div className="mb-12 space-y-6 text-center">
                    <h1 className="text-5xl text-black font-bold">All Articles</h1>
                     <SearchBar />
                </div>

                {/* Add your articles here */}

               <Suspense fallback={<h1>Loadingg....</h1>}>
               <AllArticlePage articles={articles}/>
               </Suspense>

               


                {/* Add pagination here */}
                <div className="mt-12 flex justify-center gap-2 space-x-4">
                     <Link href={`?search=${searchText}&page=${currentPage-1}`}><button disabled={currentPage==1} className="px-2 py-1 text-black flex items-center  duration-300   justify-center gap-1"><i className="ri-arrow-left-line"></i>Prev</button></Link>   
                      {
                        Array.from({length:totalPages}).map((_,index)=>{
                            return <Link key={index} href={`?search=${searchText}&page=${index+1}`}><button className={`text-lg duration-300 hover:underline ${currentPage==index+1 && 'text-purple-600'}`}>{index+1}</button></Link>
                        })
                      }
                    <Link href={`?search=${searchText}&page=${currentPage+1}`}> <button disabled={currentPage==totalPages} className="px-2 py-1 text-black  duration-300 flex items-center  justify-center gap-1">Next<i className="ri-arrow-right-line"></i></button></Link>
                </div>      
            </main>

        </div>
    )
}