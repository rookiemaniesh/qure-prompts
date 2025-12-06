import Link from "next/link";
import { Github, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-pattern relative">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight">Qure - prompts</div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Github
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl">
          Curated prompt systems <br /> for thinkers and makers
        </h1>

        <div className="space-y-2 mb-12">
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Unlock high impact prompts you can launch instantly <br />or share with the community.
          </p>

        </div>

        {/* AI Model Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl">
          {["GPT-4", "Claude 3", "Gemini", "Llama 3", "Mistral", "Grok"].map((model) => (
            <button
              key={model}
              className="px-6 py-2.5 rounded-full border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium"
            >
              {model}
            </button>
          ))}
        </div>


        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mt-12">
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full px-6 py-4 pl-14 text-lg bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm hover:shadow-md transition-all"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </main >
    </div >
  );
}