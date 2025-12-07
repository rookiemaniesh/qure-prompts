export function LandingFooter() {
    return (
        <footer className="w-full pt-12 pb-0 flex flex-col items-center justify-end relative overflow-hidden bg-white/50 border-t border-gray-100/50 mt-2">
            <div className="mb-12 md:mb-6 text-center z-10">
                <p className="text-gray-400 text-sm">
                    © 2025 Qure. All rights reserved.
                </p>
            </div>

            <div className="w-full flex justify-end items-end leading-[0.75]">
                <h1 className="text-[18vw] md:text-[22vw] font-[800] tracking-tighter text-white select-none transition-all duration-500"
                    style={{
                        textShadow: '0 0 1px rgba(0,0,0,0.1), 0 0 15px rgba(0,0,0,0.05)',
                        WebkitTextStroke: '1px rgba(0,0,0,0.02)' // Very subtle stroke to define edges
                    }}
                >
                    Qure
                </h1>
            </div>
        </footer>
    );
}
