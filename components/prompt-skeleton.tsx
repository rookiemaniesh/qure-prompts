export function PromptSkeleton() {
    return (
        <div className="bg-white border border-gray-200 rounded-[32px] p-6 flex flex-col justify-between h-full min-h-[220px] animate-pulse">
            <div>
                <div className="flex items-start justify-between mb-3">
                    <div className="h-7 bg-gray-200 rounded-md w-3/4"></div>
                    <div className="h-6 w-12 bg-gray-100 rounded-full"></div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                    <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                    <div className="h-6 w-14 bg-gray-100 rounded-full"></div>
                </div>
            </div>

            <div>
                <div className="h-px bg-gray-50 w-full mb-4"></div>
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2 items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                    </div>
                    <div className="h-4 w-16 bg-gray-100 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export function PromptGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
                <PromptSkeleton key={i} />
            ))}
        </div>
    )
}
