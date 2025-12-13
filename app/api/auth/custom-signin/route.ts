import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'
import { createJwt, setTokenCookie } from "@/lib/auth";

export async function POST(req:Request) {
    try {
        const body=await req.json();
        const {email,password}=body;
        if(!email || !password ){
            return NextResponse.json({
                error:"Fill each and every details"
            })
        }
        const exists=await prisma.user.findUnique({where:{email}})
        if(!exists)return NextResponse.json({
            error:"User Doesn't Exists"
        })
        const passCheck=await bcrypt.compare(password,exists.password);
        if(!passCheck) return NextResponse.json({
            error:"This Combination Doesn't Exists!"
        })
        const token=createJwt({userId:exists.id})
        const res = NextResponse.json({ user: { id: exists.id, email: exists.email, name: exists.firstName } });

        setTokenCookie(res,token)
        return res

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error:"Internal Server Error"
        })
    }
}