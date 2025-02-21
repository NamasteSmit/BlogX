"use server"

import prisma from "@/lib/db";
import {z} from "zod"
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { redirect } from "next/navigation";
import {v2 as cloudinary , UploadApiResponse} from "cloudinary"
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

interface ArticleProps {
    title: string;
    content: string;
    photo: File;
    category: string
}

const articleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    category: z.string() // you can list your categories
  });

  type CreateArticleFormState = {
    errors : {
        title?: string[],
        category?: string[],
        photo?: string[],
        content?: string[],
        formErrors?: string[]
    }
  }

export async function CreateNewArticle({title , content , category, photo}:ArticleProps) : Promise<CreateArticleFormState>{
       const validateSchema = articleSchema.safeParse({title, content, category});
       if(!validateSchema.success){
          return {
             errors: validateSchema.error.flatten().fieldErrors
          }
       }

       const session = await getServerSession(authOption);
       console.log("sesssion----asd>>",session)
       if(!session?.user){
         return {
               errors : {
                formErrors : ["You must be logged in"]
               }
        }
       }

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
        
        const existingUser = await prisma.user.findUnique({
            where : {
                email : session.user.email as string
            }
        })

        if(!existingUser){
            return {
                errors : {
                    formErrors : ["User not found"]
                }
            }
        }

        try{
           await prisma.article.create({
            data : {
                title : title,
                content : content,
                authorId : existingUser?.id,
                imageUrl : imageUrl,
                category : category
            }
           })
        }catch(err){
           return {
             errors : {
                formErrors : ["Some Internal Error occurred"]
             }
            }
           }
 
        revalidatePath('/dashboard')
        revalidatePath('/')

        redirect('/dashboard')
}
