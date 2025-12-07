export function Footer() {
    return (
        <footer className="w-full pb-0 pt-24 flex flex-col items-center justify-end overflow-hidden relative">
            <div className="absolute top-8 inset-x-0 flex justify-center z-10">
                <p className="text-sm text-gray-500 font-medium">
                    © 2025 Qure. All rights reserved.
                </p>
            </div>

            <div className="w-full select-none pointer-events-none flex justify-center items-end leading-none">
                <h1
                    className="text-[15vw] md:text-[20vw] font-bold text-transparent tracking-tighter text-center"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px rgba(0,0,0,0.03)',
                        textShadow: '0px 0px 80px rgba(0,0,0,0.05)'
                    }}
                >
                    <span
                        className="text-white relative z-0"
                        style={{
                            textShadow: '-1px -1px 2px rgba(255,255,255,1), 1px 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        Qure 
                    </span>
                </h1>
            </div>

            {/* Alternative implementation closer to the "embossed" look request if the above isn't perfectly matching "same color as bg with shadow border" */}
            <div className="w-full flex justify-center -mt-[8vw] md:-mt-[10vw] hidden">
                {/* This section mimics the neumorphic/soft shadow text specifically */}
                <span className="text-[20vw] font-bold text-[#F9FAFB] drop-shadow-lg" style={{ textShadow: "4px 4px 10px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,1)" }}>
                    Qure
                </span>
            </div>
        </footer>
    );
}

// Re-refined version based on specific "text same color as bg but shadow effect around borders"
export function LandingFooter() {
    return (
        <footer className="w-full py-12 pb-0 flex flex-col items-center justify-end relative overflow-hidden bg-white/50 border-t border-gray-100/50 mt-20">
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
