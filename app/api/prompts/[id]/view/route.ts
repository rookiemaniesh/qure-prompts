import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { deleteCachedPattern, CACHE_KEYS } from '@/lib/redis';

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const promptId = parseInt(id);

        if (isNaN(promptId)) {
            return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
        }

        const updatedPrompt = await prisma.prompt.update({
            where: { id: promptId },
            data: {
                views: {
                    increment: 1,
                },
            },
        });

        // Invalidate all cached prompt lists since view count changed
        // This ensures the updated view count appears in list views
        await deleteCachedPattern(`${CACHE_KEYS.PROMPTS_LIST}:*`);
        console.log(`Invalidated prompt list caches after view increment for prompt ${promptId}`);

        return NextResponse.json({
            success: true,
            views: updatedPrompt.views
        });
    } catch (error) {
        console.error('Error incrementing views:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
