import { prisma } from "@/lib/prisma";
import { PromptGridInfinite } from "@/components/prompt-grid-infinite";

export async function PromptGrid({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const q = params.q || "";

    const whereClause = q
        ? {
            OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                { desc: { contains: q, mode: "insensitive" as const } },
                { prompt: { contains: q, mode: "insensitive" as const } },
                { tags: { has: q } },
            ],
        }
        : undefined;

    const limit = 9;
    const items = await prisma.prompt.findMany({
        where: whereClause,
        orderBy: {
            createdAt: "desc",
        },
        take: limit + 1, // Fetch one extra to check if there are more
    });

    const hasMore = items.length > limit;
    const prompts = hasMore ? items.slice(0, limit) : items;

    return (
        <PromptGridInfinite
            initialPrompts={prompts}
            initialHasMore={hasMore}
            initialNextCursor={hasMore ? limit : null}
            searchQuery={q}
        />
    );
}

