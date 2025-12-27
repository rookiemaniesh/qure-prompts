import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma'
import { promptSchema } from '@/lib/validators';
import { NextResponse } from 'next/server';
import {
    getCached,
    setCached,
    deleteCachedPattern,
    getPromptsListCacheKey,
    CACHE_TTL,
    CACHE_KEYS
} from '@/lib/redis';


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

        // Invalidate all cached prompt lists since we added a new prompt
        await deleteCachedPattern(`${CACHE_KEYS.PROMPTS_LIST}:*`);
        console.log('Invalidated all prompt list caches after creating new prompt');

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

        // Generate cache key based on query parameters
        const cacheKey = getPromptsListCacheKey(cursor, limit, q);

        // Try to get from cache first
        const cachedData = await getCached<{
            prompts: any[];
            nextCursor: number | null;
            hasMore: boolean;
        }>(cacheKey);

        if (cachedData) {
            console.log('Cache HIT for prompts list');
            return NextResponse.json(cachedData);
        }

        console.log('Cache MISS for prompts list - querying database');

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

        const responseData = {
            prompts,
            nextCursor: hasMore ? cursor + limit : null,
            hasMore,
        };

        // Cache the result
        await setCached(cacheKey, responseData, CACHE_TTL.PROMPTS_LIST);

        return NextResponse.json(responseData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal Server Error!"
        }, { status: 500 });
    }
}
