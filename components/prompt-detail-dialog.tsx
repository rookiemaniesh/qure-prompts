"use client";

import { X, Maximize2, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface PromptDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    content?: string;
    author?: string;
    date?: string;
}

const HIGHLIGHT_KEYWORDS = ["AI", "A", "for", "in", "with"];

type Tab = "Prompt" | "Date of Creation (GMT)" | "Author";

export function PromptDetailDialog({
    isOpen,
    onClose,
    title,
    description,
    content,
    author = "Unknown",
    date = "Oct 24, 2024"
}: PromptDetailDialogProps) {
    const [activeTab, setActiveTab] = useState<Tab>("Prompt");
    const [copied, setCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const displayContent = content || description || "No content available.";

    const handleCopy = () => {
        navigator.clipboard.writeText(displayContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple syntax highlighter
    const renderHighlightedContent = (text: string) => {
        const parts = text.split(/(\s+)/);
        return parts.map((part, i) => {
            if (HIGHLIGHT_KEYWORDS.includes(part)) {
                return <span key={i} className="text-purple-500 font-medium">{part}</span>;
            } else if (part === "AI") {
                return <span key={i} className="text-cyan-500 font-medium">{part}</span>;
            }
            return part;
        });
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative bg-white rounded-3xl w-full max-w-2xl mx-4 shadow-2xl transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                {/* Header */}
                <div className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-1">
                        <h2 className="text-2xl font-bold text-black">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm">{description.slice(0, 60)}...</p>
                </div>

                {/* Tabs & Content Container */}
                <div className="px-8 pb-8">
                    <div className="border border-gray-200 rounded-2xl overflow-hidden">
                        {/* Tab Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                            <div className="flex gap-6">
                                {(["Prompt", "Date of Creation (GMT)", "Author"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-sm font-medium transition-colors ${activeTab === tab
                                                ? "text-black bg-gray-100 px-3 py-1.5 rounded-lg"
                                                : "text-gray-500 hover:text-black"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition-colors">
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 bg-white min-h-[200px] text-gray-800 text-[15px] leading-relaxed font-mono">
                            {activeTab === "Prompt" && (
                                <div>
                                    {renderHighlightedContent(displayContent)}
                                </div>
                            )}
                            {activeTab === "Date of Creation (GMT)" && (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    {date}
                                </div>
                            )}
                            {activeTab === "Author" && (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    {author}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
