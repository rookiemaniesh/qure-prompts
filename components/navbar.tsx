"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="text-3xl font-bold tracking-tighter">
                Qure <span className="font-semibold text-gray-700"></span>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    href="https://github.com"
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                >
                    Github
                    <Github className="w-4 h-4" />
                </Link>
                {session ? (
                    <button
                        onClick={() => signOut()}
                        className="px-6 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="px-6 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
