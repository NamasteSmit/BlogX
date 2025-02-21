"use server"
import { authOption } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import {z} from "zod"
import {v2 as cloudinary , UploadApiResponse} from "cloudinary"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const articleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    category: z.string() // you can list your categories
  });

interface ArticleProps {
    title: string;
    content: string;
    photo: File;
    category: string
    id : string
}

type CreateArticleFormState = {
    errors : {
        title?: string[],
        category?: string[],
        photo?: string[],
        content?: string[],
        formErrors?: string[]
    }
  }


export async function EditYourArticle({title , content , category , photo ,id}:ArticleProps):Promise<CreateArticleFormState>{
     
    console.log(title , content , category , photo , id);
     
    const validateSchema = articleSchema.safeParse({title , content , category});
    if(!validateSchema.success){
        return {
            errors: validateSchema.error.flatten().fieldErrors
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

    const existingArticle = await prisma.article.findUnique({
        where : {
            id : id
        }
     })

     if(!existingArticle){
         return {
             errors : {
                 formErrors : ["Article not found"]
             }
         }
     }

    //cloudinary stuff
    const ImageFile = photo as File | null;
           if(!ImageFile || ImageFile.name==="undefined"){
             return {
                 errors : {
                    photo : ["Please select an image"]
                 }
             }
           }
    
           // to upload Image on Cloudinary 
           //1. you have to convert your image to buffer
           const arrayBuffer = await ImageFile.arrayBuffer();
           const buffer = Buffer.from(arrayBuffer);
    
            const uploadResponse : UploadApiResponse | undefined =  await new Promise((resolve, reject) =>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {resource_type:'auto'},
                    (error , result)=>{
                        if(error){
                            reject(error)
                        }else{
                            resolve(result)
                        }
                    }
                )
                uploadStream.end(buffer)
            })
            
            const imageUrl = uploadResponse?.secure_url;
            if(!imageUrl){
                return {
                    errors : {
                        photo : ["Failed to upload image"]
                    }
                }
            }
            console.log("ImageUrl",imageUrl);
        
            try {
                await prisma.article.update({
                    where : {
                        id : id
                    },
                    data : {
                        title : title,
                        content : content,
                        category : category,
                        imageUrl : imageUrl
                    }
                })

            }catch(err){
                 console.log(err);
             return {
                errors :{
                    formErrors : ['Internal Server Error']
                }
             }
            }

            revalidatePath('/dashboard')

            redirect('/dashboard')
            

}