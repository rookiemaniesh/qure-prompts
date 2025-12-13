"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";
import { useState } from "react";

export default function AddPromptPage() {
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [promptContent, setPromptContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title || !promptContent || selectedModels.length === 0) {
            setError("Please fill in title, content and select at least one model");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    desc: description,
                    prompt: promptContent,
                    models: selectedModels,
                    tags,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create prompt");
            }

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const models = ["ChatGPT", "Claude", "Gemini", "Midjourney", "Perplexity", "Grok"];

    const toggleModel = (model: string) => {
        if (selectedModels.includes(model)) {
            setSelectedModels(selectedModels.filter((m) => m !== model));
        } else {
            setSelectedModels([...selectedModels, model]);
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const tag = currentTag.trim();
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="h-screen bg-white overflow-hidden flex flex-col">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-grid-pattern -z-10 opacity-50" />

            <div className="w-full h-full p-8 md:p-12 lg:p-16 flex flex-col">
                {/* Close Button */}
                <Link
                    href="/"
                    className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </Link>

                <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col">
                    <h1 className="text-2xl font-medium text-gray-900 mb-8 shrink-0">add your prompt</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-16 flex-1 min-h-0">
                        {/* Left Column - Metadata */}
                        <div className="space-y-8 flex flex-col h-full overflow-y-auto pr-4 scrollbar-hide">
                            {/* Title */}
                            <div className="space-y-4 shrink-0">
                                <label htmlFor="title" className="text-sm font-medium text-gray-500 uppercase tracking-wider block">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full px-0 py-2 text-2xl bg-transparent border-b border-gray-200 focus:border-black focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Video Ad Creator"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-4 shrink-0">
                                <label htmlFor="description" className="text-sm font-medium text-gray-500 uppercase tracking-wider block">Description</label>
                                <textarea
                                    id="description"
                                    className="w-full h-[150px] p-6 text-base bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none placeholder:text-gray-400"
                                    placeholder="Briefly describe what your prompt does..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Preferred Models */}
                            <div className="space-y-4 shrink-0">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Models</div>
                                <div className="flex flex-wrap gap-3">
                                    {models.map(model => (
                                        <button
                                            key={model}
                                            onClick={() => toggleModel(model)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${selectedModels.includes(model)
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {model}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-4 shrink-0">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tags</div>
                                <div className="relative">
                                    <input
                                        id="tags"
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all placeholder:text-gray-400"
                                        placeholder="Type tag & press enter"
                                    />
                                    <button
                                        onClick={addTag}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 transition-all min-h-[32px]">
                                    {tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Prompts */}
                        <div className="flex flex-col h-full gap-6">
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            <label htmlFor="content" className="sr-only">Prompt Content</label>
                            <div className="flex-1 relative">
                                <textarea
                                    id="content"
                                    value={promptContent}
                                    onChange={(e) => setPromptContent(e.target.value)}
                                    className="w-full h-full p-8 text-lg bg-gray-50/50 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none font-mono placeholder:text-gray-400 leading-relaxed"
                                    placeholder="Write your prompt content here..."
                                ></textarea>
                            </div>

                            {/* Post Button (Outside the text area) */}
                            <div className="flex justify-end shrink-0">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-10 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors shadow-xl text-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Posting..." : "Post Prompt"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
