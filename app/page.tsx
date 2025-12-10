import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { PromptCard } from "@/components/prompt-card";
import { LandingFooter } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const prompts = await prisma.prompt.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-grid-pattern relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl">
          Curated prompt systems <br /> for thinkers and makers
        </h1>

        <div className="space-y-2 mb-12">
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Unlock high impact prompts you can use instantly <br />
            or <Link href="/add-prompt" className="inline-flex items-center gap-3 ml-2 px-2 py-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-full transition-colors text-base font-normal align-middle group border border-gray-200/50">
              <span className="text-gray-600 pl-2">Add your own</span>
              <span className="w-8 h-8 flex items-center justify-center bg-gray-200/50 rounded-lg  transition-colors">
                <span className="text-xs font-mono text-gray-500">{">_"}</span>
              </span>
            </Link>
          </p>

        </div>

        {/* AI Model Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl">
          {[
            { name: "ChatGPT", icon: "/icons-model/chatgpt-icon.webp" },
            { name: "Gemini", icon: "/icons-model/google-gemini-icon.svg" },
            { name: "Claude", icon: "/icons-model/claude-ai-icon.svg" },
            { name: "Grok", icon: "/icons-model/grok-icon.svg" },
            { name: "Perplexity", icon: "/icons-model/perplexity-ai-icon.svg" },
            { name: "Midjourney", icon: "/icons-model/midjourney-blue-icon.svg" },
          ].map((model) => (
            <button
              key={model.name}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 hover:text-black"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={model.icon}
                  alt={model.name}
                  fill
                  className="object-contain"
                />
              </div>
              {model.name}
            </button>
          ))}
        </div>


        {/* Search Bar */}
        <div className="relative w-full max-w-lg mt-12">
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full px-6 py-3 pl-12 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm hover:shadow-md transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Prompts Grid */}
        <div className="w-full max-w-6xl mt-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                description={prompt.desc || ""}
                prompt={prompt.prompt}
                tags={prompt.tags}
                rating={prompt.views}
                featured={false}
                model={prompt.models[0] || "ChatGPT"}
              />
            ))}
          </div>
        </div>


      </main >
      <div className="w-full mt-20 pr-5">
        <LandingFooter />
      </div>
    </div >
  );
}