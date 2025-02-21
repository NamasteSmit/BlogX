import NextAuth from "next-auth";
import { authOption } from "@/lib/auth";


export const helper = NextAuth(authOption);

export {helper as GET , helper as POST};