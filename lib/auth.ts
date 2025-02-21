import Google from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOption : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
           credentials : {
            email : {label:"Email" , type:"text" , placeholder:"Enter your email"},
            password : {label : "Password" , type:"password" , placeholder:"Enter your password"}
           },
           async authorize(credentials:any):Promise<any>{
             console.log(credentials);
             return {
                email : credentials.email,
                password : credentials.password
             }
           } 
        }),
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks : {
        async jwt({token, user }:{token : JWT , user:User}){
              if(user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
              }
              return token;
        },
        async session({session, token} : {session : Session , token:JWT}){
            session.user = {
                name : token.name,
                id : token.id as string,
                email : token?.email,
            }
            return session;
        }
    },
    secret : process.env.NEXTAUTH_SECRET 
}