"use client"
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PromptDetailDialog } from "./prompt-detail-dialog";

interface PromptCardProps {
    id: number;
    title: string;
    description: string;
    prompt: string;
    tags: string[];
    rating: number; // We'll interpret this as 'views' for the new design
    featured?: boolean;
    models: string[];
}

const MODEL_ICONS: Record<string, string> = {
    "ChatGPT": "/icons-model/chatgpt-icon.webp",
    "Gemini": "/icons-model/google-gemini-icon.svg",
    "Claude": "/icons-model/claude-ai-icon.svg",
    "Grok": "/icons-model/grok-icon.svg",
    "Perplexity": "/icons-model/perplexity-ai-icon.svg",
    "Midjourney": "/icons-model/midjourney-blue-icon.svg",
    "Dall-E": "/icons-model/dall-e-icon.png",
    "Llama": "/icons-model/llama-icon.png",
};

export function PromptCard({ id, title, description, tags, rating, featured, models, prompt }: PromptCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [viewCount, setViewCount] = useState(rating);

    const handleOpenDialog = async () => {
        setIsDialogOpen(true);

        // Increment view count
        try {
            const response = await fetch(`/api/prompts/${id}/view`, {
                method: 'POST',
            });
            const data = await response.json();
            if (data.views !== undefined) {
                setViewCount(data.views);
            }
        } catch (error) {
            console.error('Failed to increment view count:', error);
        }
    };

    // Truncate logic
    const MAX_LENGTH = 120;
    const shouldTruncate = description.length > MAX_LENGTH;
    const displayDescription = shouldTruncate
        ? description.slice(0, MAX_LENGTH).trim()
        : description;

    const displayModels = models.length > 3 ? models.slice(0, 2) : models;
    const remainingCount = models.length > 3 ? models.length - 2 : 0;

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-[32px] p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 h-full min-h-[220px]">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-left tracking-tight leading-tight">{title}</h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                            <span className="font-medium">{viewCount}</span>
                            <Eye className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <p className="text-gray-600 text-left text-[14px] mb-4 leading-relaxed font-medium">
                        {displayDescription}
                        {shouldTruncate && (
                            <span
                                onClick={handleOpenDialog}
                                className="text-blue-300 cursor-pointer ml-1  transition-colors"
                            >
                                ...more
                            </span>
                        )}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-500 border border-gray-100 font-medium hover:bg-gray-100 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="h-px bg-gray-50 w-full mb-4"></div>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2 items-center">
                            {displayModels.map((modelName, index) => {
                                const iconSrc = MODEL_ICONS[modelName] || MODEL_ICONS["ChatGPT"];
                                return (
                                    <div
                                        key={index}
                                        className="relative w-8 h-8 rounded-full bg-white border-2 border-white overflow-hidden shadow-sm"
                                        title={modelName}
                                    >
                                        <Image
                                            src={iconSrc}
                                            alt={modelName}
                                            fill
                                            className="object-cover p-1"
                                        />
                                    </div>
                                );
                            })}
                            {remainingCount > 0 && (
                                <div className="relative w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center shadow-sm">
                                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleOpenDialog}
                            className="text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1 font-semibold group uppercase tracking-wide"
                        >
                            Preview
                            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>

            <PromptDetailDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={title}
                description={description}
                prompt={prompt}
            />
        </>
    );
}
