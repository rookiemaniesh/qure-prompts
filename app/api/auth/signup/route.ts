import bcrypt from "bcryptjs";
import  {prisma}  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body= await req.json();
        const {email,password,firstName,lastName}=body;
        if(!email || !password || !firstName || !lastName){
            return NextResponse.json({
                error:"Fill each and every details"
            })
        }
        const exists=await prisma.user.findUnique({where:{email}})
        if(exists) return NextResponse.json({
            error:"User Already Exists"
        })
        const hashed=await bcrypt.hash(password,10)
        const User=await prisma.user.create({
            data:{email,
            password:hashed,
            firstName,
            lastName}
        })
        return NextResponse.json({
            message:"Account Created"
        }, {status:201})
    }
    catch(err){
        console.error(err);
        return NextResponse.json({
            error:"Internal Server Error"
        }, {status:500})
    }
}
