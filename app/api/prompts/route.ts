import { getTokenFromRequest, verifyJwt } from '@/lib/auth';
import { prisma } from '@/lib/prisma'
import { promptSchema } from '@/lib/validators';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // const token = getTokenFromRequest(req);
        // const decoded = token ? verifyJwt(token) : null;
        // if (!decoded?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const p = promptSchema.safeParse(body);
        if (!p.success) {
            return NextResponse.json({ error: p.error.flatten() }, { status: 400 })
        }
        const box = await prisma.prompt.create({
            data: {
                title: p.data.title,
                prompt: p.data.prompt,
                desc: p.data.desc,
                models: p.data.models,
                tags: p.data.tags ?? [],
                authorId: "abc"
            }
        })
        return NextResponse.json({
            message: "Prompt Added!"
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal Server Error!"
        })
    }

}

export async function GET(req: Request) {
    try {
        const items = await prisma.prompt.findMany({ orderBy: { createdAt: 'desc' } })
        return NextResponse.json(items)
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Interval Server Error!"
        })
    }
}
