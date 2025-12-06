import { Bot, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";

interface PromptCardProps {
    title: string;
    description: string;
    tags: string[];
    rating: number;
    featured?: boolean;
}

export function PromptCard({ title, description, tags, rating, featured }: PromptCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow h-full">
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg">{title}</h3>
                        {featured && (
                            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                                Featured
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                        <span>{rating}</span>
                        <Sparkles className="w-3 h-3" />
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100/80 rounded-full text-xs text-gray-600 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <div className="h-px bg-gray-100 w-full mb-4"></div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Bot className="w-5 h-5 text-gray-700" />
                        <Wand2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <button className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1 font-medium group">
                        Preview prompt
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
