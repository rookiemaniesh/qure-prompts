import { clearTokenCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = NextResponse.json({ success: true }, { status: 200 });
    clearTokenCookie(response);
    return response;
}