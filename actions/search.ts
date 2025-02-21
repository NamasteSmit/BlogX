"use server"

import { redirect } from "next/navigation"


export default async function SearchAction(formData:FormData){
    const searchText = formData.get("search")
    if(typeof searchText !== "string" || !searchText){
        redirect("/");
    }

    redirect(`/articles/?search=${searchText}`);
}