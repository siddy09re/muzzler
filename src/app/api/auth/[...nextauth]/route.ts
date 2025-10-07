import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

import { PrismaClient } from "@prisma/client";

const prismaclient = new PrismaClient();


const handler = NextAuth({
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
  })
],


callbacks:{
  async signIn(params){
    console.log(params);
    if(!params.user.email){
      return false
    }
    try{
        await prismaclient.user.create({
          data:{
            email:params.user.email,
            provider:"Google"
          }
        })
    }catch(e){

    }

    return true
  }
}

})

export { handler as GET, handler as POST }