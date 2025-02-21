"use client";

import Image from "next/image";
import { useState } from "react";
// import ReactQuill from "react-quill-new";

import "react-quill/dist/quill.snow.css"; // Quill CSS
import dynamic from "next/dynamic";
import type { Article } from "@prisma/client";
const ReactQuill = dynamic(()=>import('react-quill-new'),{ssr:false})

import { EditYourArticle } from "@/actions/edit-article";

type EditArticleProps = {
    article: Article;
}

export default function EditArticleComponent({article}:EditArticleProps) {

  const [title, setTitle] = useState(article.title);
  const [category, setCategory] = useState(article.category);
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState(article.content);
  const [errors , setErrors] = useState<Record<string , string[]>>();

  const handleImageUpload = (e : React.ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.files || e.target.files.length === 0 )
    {
        setImage(null); // Clear the preview
    }
    if(e.target.files && e.target.files.length > 0){
        setImage(e.target.files[0]);
    }
  }

  const handleClearAll = ()=>{
    setTitle("");
    setCategory("");
    setImage(null);
    setContent("");
    setErrors({});
  }

  const handleEditArticle = async()=>{
      const response = await EditYourArticle({title , content , category , photo:image as File , id:article.id})
      setErrors(response?.errors);
  }
  return (
     <div className="w-full min-h-screen  flex justify-center px-2 md:px-20">
        <div className="border h-fit rounded-lg shadow-lg w-full mt-4 px-2 md:px-6 p-2 flex flex-col space-y-2 md:space-y-5">

            <div className="w-full px-2 md:px-4">
                <h1 className="text-xl text-black font-semibold mb-5">Edit Article</h1>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-transparent w-full px-4 py-2 border rounded outline-none text-black" type="text" placeholder="Enter a article title"/>
                {errors?.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>
           
            <div className="py-2 px-4 flex flex-col space-y-3">
                <label className="text-black">Category</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-transparent outline-none border py-2 rounded text-black">
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="programming">Programming</option>
                    <option value="react">React</option>
                </select>
                {errors?.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p> }
            </div>

            <div className="px-4 py-2">
                <label className="text-black">Featured Image</label>
                <div className="flex justify-between items-center gap-2">
                <input onChange={handleImageUpload}  className="bg-transparent w-full px-4 py-2 border rounded outline-none text-black" type="file"/>
                </div>
                {errors?.photo && <p className="text-sm text-red-600 mt-1">{errors.photo}</p> }
                {!image ? 
                <Image className="w-48 h-32 mt-4" src={article.imageUrl as string} width={24} height={24} alt="Uploaded Image"/> 
                :<Image className="w-48 h-32 mt-4" src={URL.createObjectURL(image)} width={24} height={24} alt="Uploaded Image"/> 
            }

            </div>

            <div className="px-4 py-2">
                <label className="text-black">Content</label>
                <ReactQuill theme="snow" value={content} onChange={setContent} className="text-black py-2"/>
                {errors?.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p> }
            </div>

            {errors?.formErrors && <p className="text-sm text-red-600 mt-1">{errors.formErrors}</p>  }

            <div className="px-4 py-2 w-full flex space-x-4 items-center justify-end ">
                 <button onClick={handleClearAll} className="px-4 py-2 border rounded-lg text-zinc-800 hover:bg-gray-100 transition">
                      Clear All
                  </button>
                  <button onClick={handleEditArticle}  className={`px-4 disabled ${(title || image || category || content) ? "text-zinc-800 hover:bg-gray-100 transition" : "cursor-not-allowed disabled" } py-2 border rounded-lg `}>
                      Update Article
                  </button>
            </div> 
        </div>
     </div>
  );
}
