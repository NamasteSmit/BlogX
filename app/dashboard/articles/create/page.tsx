"use client";

import Image from "next/image";
import { useState } from "react";
// import ReactQuill from "react-quill-new";

import "react-quill/dist/quill.snow.css"; // Quill CSS
import dynamic from "next/dynamic";
const ReactQuill = dynamic(()=>import('react-quill-new'),{ssr:false})

import { CreateNewArticle } from "@/actions/create-article";
export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [errors , setErrors] = useState<Record<string , string[]>>();
  console.log("content--->" , content)
  console.log("image",image)
  console.log("errors", errors)




     const handleImageUpload = (e : React.ChangeEvent<HTMLInputElement>)=>{
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null); // Clear the preview
          }
        if(e.target.files && e.target.files.length>0){
            setImage(e.target.files[0]);
        }
     }

     const handleArticleSubmit = async()=>{
        setErrors({})
        const response = await CreateNewArticle({title , content , category , photo:image as File})
         setErrors(response?.errors);
     }

  return (
     <div className="w-full min-h-screen  flex justify-center px-2 md:px-20">
        <div className="border h-fit rounded-lg shadow-lg w-full mt-12 px-6 p-2 flex flex-col space-y-5">

            <div className="w-full px-4">
                <h1 className="text-xl text-black font-semibold mb-5">Create New Article</h1>
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
                <input onChange={handleImageUpload} className="bg-transparent w-full px-4 py-2 border rounded outline-none text-black" type="file"/>
                {image && <Image className="w-10 h-10" src={URL.createObjectURL(image)} width={24} height={24} alt="Uploaded Image"/> }
                </div>
                {errors?.photo && <p className="text-sm text-red-600 mt-1">{errors.photo}</p> }
            </div>

            <div className="px-4 py-2">
                <label className="text-black">Content</label>
                <ReactQuill theme="snow" value={content} onChange={setContent} className="text-black py-2"/>
                {errors?.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p> }
            </div>

            {errors?.formErrors && <p className="text-sm text-red-600 mt-1">{errors.formErrors}</p>  }

            <div className="px-4 py-2 w-full flex space-x-4 items-center justify-end ">
                 <button className="px-4 py-2 border rounded-lg text-zinc-800 hover:bg-gray-100 transition">
                      Cancel
                  </button>
                  <button onClick={handleArticleSubmit} className={`px-4 disabled ${(title&&image&&category&&content) ? "text-zinc-800 hover:bg-gray-100 transition" : "cursor-not-allowed disabled" } py-2 border rounded-lg `}>
                      Push Article
                  </button>
            </div> 
        </div>
     </div>
  );
}
