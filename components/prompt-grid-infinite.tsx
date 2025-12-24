'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { PromptCard } from '@/components/prompt-card';

interface Prompt {
    id: number;
    title: string;
    desc: string | null;
    prompt: string;
    tags: string[];
    views: number;
    models: string[];
}

interface PromptGridInfiniteProps {
    initialPrompts: Prompt[];
    initialHasMore: boolean;
    initialNextCursor: number | null;
    searchQuery?: string;
}

export function PromptGridInfinite({
    initialPrompts,
    initialHasMore,
    initialNextCursor,
    searchQuery = '',
}: PromptGridInfiniteProps) {
    const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [nextCursor, setNextCursor] = useState(initialNextCursor);
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Reset when search query changes
    useEffect(() => {
        setPrompts(initialPrompts);
        setHasMore(initialHasMore);
        setNextCursor(initialNextCursor);
    }, [searchQuery, initialPrompts, initialHasMore, initialNextCursor]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore || nextCursor === null) return;

        setLoading(true);
        try {
            const params = new URLSearchParams({
                cursor: nextCursor.toString(),
                limit: '9',
            });

            if (searchQuery) {
                params.append('q', searchQuery);
            }

            const response = await fetch(`/api/prompts?${params}`);
            const data = await response.json();

            if (data.prompts) {
                // Deduplicate prompts by ID to prevent duplicate keys
                setPrompts((prev) => {
                    const existingIds = new Set(prev.map(p => p.id));
                    const newPrompts = data.prompts.filter((p: Prompt) => !existingIds.has(p.id));
                    return [...prev, ...newPrompts];
                });
                setHasMore(data.hasMore);
                setNextCursor(data.nextCursor);
            }
        } catch (error) {
            console.error('Error loading more prompts:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, nextCursor, searchQuery]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loadMore, hasMore, loading]);

    if (prompts.length === 0 && !loading) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No prompts found matching your search.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt) => (
                    <PromptCard
                        key={prompt.id}
                        id={prompt.id}
                        title={prompt.title}
                        description={prompt.desc || ''}
                        prompt={prompt.prompt}
                        tags={prompt.tags}
                        rating={prompt.views}
                        featured={false}
                        models={prompt.models}
                    />
                ))}
            </div>

            {/* Loading indicator and intersection observer target */}
            <div ref={observerTarget} className="py-8 text-center">
                {loading && (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                )}
                {!hasMore && prompts.length > 0 && (
                    <p className="text-gray-400 text-sm">No more prompts to load</p>
                )}
            </div>
        </div>
    );
}
