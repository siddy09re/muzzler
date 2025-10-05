
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import { PrismaClient } from "@prisma/client";
import { da } from "zod/locales";
import { url } from "inspector";


const prismaclient = new PrismaClient();
const YT_REGEX = new RegExp("(?:(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/))([A-Za-z0-9_-]{11})");

const CreateStreamSchema = z.object({
    createrId : z.string(),
    url : z.string()
}) 

export async function POST(req : NextRequest){
    try{
        const data = CreateStreamSchema.parse(await req.json());
        const isYT = YT_REGEX.test(data.url);
        if(!isYT){
             return NextResponse.json({
            message : "Wrong URL bro"
        } , {
            status : 403
        })
        }

        const extractedId = data.url.split("?v=")[1];

      await  prismaclient.stream.create({
            data:{
                userId : data.createrId,
                url : data.url,
                extractedId,
                type:"Youtube",
                upvotes: 0,
            }
        })
    }catch(error){

        return NextResponse.json({
            message : "Error while adding a stream"
        } , {
            status : 411
        })

    }
}