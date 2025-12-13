import { prisma } from "@/lib/prisma";
import { PromptCard } from "@/components/prompt-card";

export async function PromptGrid({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const q = params.q || "";

    const prompts = await prisma.prompt.findMany({
        where: q
            ? {
                OR: [
                    { title: { contains: q, mode: "insensitive" } },
                    { desc: { contains: q, mode: "insensitive" } },
                    { prompt: { contains: q, mode: "insensitive" } },
                    { tags: { has: q } },
                ],
            }
            : undefined,
        orderBy: {
            createdAt: "desc",
        },
    });

    if (prompts.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No prompts found matching your search.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
                <PromptCard
                    key={prompt.id}
                    title={prompt.title}
                    description={prompt.desc || ""}
                    prompt={prompt.prompt}
                    tags={prompt.tags}
                    rating={prompt.views}
                    featured={false}
                    models={prompt.models}
                />
            ))}
        </div>
    );
}
