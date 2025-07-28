import { connectDb } from "@/dbConfig/dbConfig";
import { verifyToken } from "@/middleware/auth";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await connectDb();
    
    
    const {userId,error} =verifyToken(req.headers);;
    
    if(error) return NextResponse.json({error},{status:401});

    const {content} = await req.json();
    const note = await Note.create({userId,content});
    return NextResponse.json({message:"Note Created",note});

}