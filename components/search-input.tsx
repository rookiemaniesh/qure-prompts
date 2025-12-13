"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchParams.get("q") === query) {
                return;
            }

            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set("q", query);
            } else {
                params.delete("q");
            }
            router.push(`/?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, searchParams]);

    return (
        <div className="relative w-full max-w-lg mt-12">
            <input
                type="text"
                placeholder="Search prompts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-6 py-3 pl-12 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm hover:shadow-md transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
    );
}
