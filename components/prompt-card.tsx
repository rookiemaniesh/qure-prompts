"use client"
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PromptDetailDialog } from "./prompt-detail-dialog";

interface PromptCardProps {
    title: string;
    description: string;
    tags: string[];
    rating: number; // We'll interpret this as 'views' for the new design
    featured?: boolean;
    model: string;
}

const MODEL_ICONS: Record<string, string> = {
    "ChatGPT": "/icons-model/chatgpt-icon.webp",
    "Gemini": "/icons-model/google-gemini-icon.svg",
    "Claude": "/icons-model/claude-ai-icon.svg",
    "Grok": "/icons-model/grok-icon.svg",
    "Perplexity": "/icons-model/perplexity-ai-icon.svg",
    "Midjourney": "/icons-model/midjourney-blue-icon.svg",
};

export function PromptCard({ title, description, tags, rating, featured, model }: PromptCardProps) {
    const iconSrc = MODEL_ICONS[model] || MODEL_ICONS["ChatGPT"];
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Truncate logic
    const MAX_LENGTH = 120;
    const shouldTruncate = description.length > MAX_LENGTH;
    const displayDescription = shouldTruncate
        ? description.slice(0, MAX_LENGTH).trim()
        : description;

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-[32px] p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 h-full min-h-[220px]">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-left tracking-tight leading-tight">{title}</h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                            <span className="font-medium">{rating}</span>
                            <Eye className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <p className="text-gray-600 text-left text-[14px] mb-4 leading-relaxed font-medium">
                        {displayDescription}
                        {shouldTruncate && (
                            <span
                                onClick={() => setIsDialogOpen(true)}
                                className="text-gray-400 hover:text-black cursor-pointer ml-1 font-semibold transition-colors"
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
                        <div className="flex gap-3 items-center">
                            <div className="relative w-5 h-5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <Image
                                    src={iconSrc}
                                    alt={model}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            {/* <MoreHorizontal className="w-5 h-5 text-gray-300" /> */}
                        </div>
                        <button
                            onClick={() => setIsDialogOpen(true)}
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
                description={description} // Pass full description as content fallback
                content={description} // Using description as content since we don't have separate content yet
            />
        </>
    );
}
