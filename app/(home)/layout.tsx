import Header from "@/components/Header"
import { getServerSession } from "next-auth"
import { authOption } from "@/lib/auth"
import prisma from "@/lib/db"
export default async function HomeLayout({children}:{
    children : React.ReactNode
}){
     console.log("Inside HomeLayout--------")
    const session = await getServerSession(authOption);
    if(session?.user){
        const user = await prisma.user.findUnique({
            where : {
                email : session.user.email as string
            }
        })

        if(!user){
            const newUser = await prisma.user.create({
                data:{
                    name : session.user.name as string,
                    email : session.user.email as string,
                    imageUrl : session.user.image as string
                }
            })
            console.log("user created successfully--->",newUser)
        }
    }
     
  return(
    <div>
        <Header/>
        {children}
    </div>
  )
}