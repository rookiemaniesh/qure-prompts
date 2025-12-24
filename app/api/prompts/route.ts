import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma'
import { promptSchema } from '@/lib/validators';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
                authorId: session.user.id
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
        const { searchParams } = new URL(req.url);
        const cursor = parseInt(searchParams.get('cursor') || '0');
        const limit = parseInt(searchParams.get('limit') || '9');
        const q = searchParams.get('q') || '';

        const whereClause = q
            ? {
                OR: [
                    { title: { contains: q, mode: 'insensitive' as const } },
                    { desc: { contains: q, mode: 'insensitive' as const } },
                    { prompt: { contains: q, mode: 'insensitive' as const } },
                    { tags: { has: q } },
                ],
            }
            : undefined;

        const items = await prisma.prompt.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            skip: cursor,
            take: limit + 1, // Fetch one extra to check if there are more
        });

        const hasMore = items.length > limit;
        const prompts = hasMore ? items.slice(0, limit) : items;

        return NextResponse.json({
            prompts,
            nextCursor: hasMore ? cursor + limit : null,
            hasMore,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal Server Error!"
        }, { status: 500 });
    }
}
