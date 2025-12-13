import { prisma } from "../lib/prisma";



async function main() {
  await prisma.prompt.deleteMany();

  await prisma.user.upsert({
    where: { id: "01f3faf0-ee3a-4632-a62d-a7e08e03a286" },
    update: {},
    create: {
      id: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
      email: "seed@example.com",
      firstName: "Seed",
      lastName: "User",
      password: "$2a$10$SeedPasswordHashPlaceholder" // Need a valid hash or placeholder
    }
  });

  await prisma.prompt.createMany({
    data: [
      {
        title: "Startup Idea Generator",
        desc: "Generate practical, modern startup ideas with clear execution paths.",
        prompt: `Generate 10 startup ideas based on the user's skills, interests, preferred industries, and emerging global trends.
For each idea, clearly describe the problem it solves and why it matters.
Explain the proposed solution and how it stands out from existing competitors.
Identify the target audience and ideal customer persona.
Include potential revenue models and pricing strategies.
Mention required technologies or tools to build the MVP.
Estimate difficulty level and time required to launch.
Present the output in a clean, structured format.`,
        models: ["ChatGPT", "Claude", "Gemini"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["startup", "business", "ideas"]
      },
      {
        title: "Code Debugging Assistant",
        desc: "Deep code analysis and debugging with clear explanations.",
        prompt: `Analyze the given code snippet and identify all logical, syntax, and runtime errors.
Explain why each bug occurs and how it affects execution.
Rewrite the faulty code using best practices and proper structure.
Provide step-by-step reasoning for the debugging process.
Mention edge cases the code currently fails to handle.
Suggest performance or readability improvements if applicable.
Offer an alternative approach if it improves maintainability.
End with final recommendations.`,
        models: ["ChatGPT", "Claude", "Grok"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["coding", "debugging", "developer"]
      },
      {
        title: "SEO Content Rewriter",
        desc: "Rewrite content for SEO without losing meaning or tone.",
        prompt: `Rewrite the provided content to be SEO-optimized while preserving its original meaning.
Improve clarity, flow, and readability using short sentences and headings.
Naturally integrate high-impact keywords without keyword stuffing.
Optimize content for search intent and user engagement.
Suggest an SEO-friendly meta title and meta description.
Provide internal linking suggestions where relevant.
Maintain a consistent tone suitable for the target audience.
Output the final version in clean markdown format.`,
        models: ["ChatGPT", "Claude", "Perplexity"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["seo", "content", "writing"]
      },
      {
        title: "YouTube Video Script Generator",
        desc: "Create high-retention YouTube scripts with strong hooks.",
        prompt: `Write a complete YouTube video script based on the given topic.
Start with a powerful hook within the first 5 seconds.
Create a clear introduction explaining what the viewer will gain.
Structure the main content into engaging sections with smooth transitions.
Add cues for B-roll, visuals, or on-screen text where helpful.
Use conversational language and storytelling techniques.
End with a compelling call-to-action tailored to the audience.
Ensure pacing is optimized for viewer retention.`,
        models: ["ChatGPT", "Claude", "Gemini"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["youtube", "script", "creator"]
      },
      {
        title: "Legal Document Simplifier",
        desc: "Convert complex legal language into simple explanations.",
        prompt: `Simplify the provided legal or contractual text into plain English.
Break down complex clauses into short, understandable points.
Explain the intent and impact of each major clause.
Highlight any risky, unusual, or important sections clearly.
Avoid changing the legal meaning or offering legal advice.
Add simple examples or analogies where helpful.
Summarize key rights and obligations at the end.
Maintain a neutral and professional tone.`,
        models: ["ChatGPT", "Claude"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["legal", "simplify", "documents"]
      },
      {
        title: "UI/UX Design Review",
        desc: "Actionable UI/UX feedback based on modern principles.",
        prompt: `Review the given UI or UX flow step-by-step.
Identify usability issues, friction points, and clarity problems.
Evaluate accessibility, readability, and visual hierarchy.
Compare the design against modern UX best practices.
Suggest specific improvements for layout, spacing, and microcopy.
Consider both desktop and mobile user experiences.
Prioritize fixes based on impact and effort.
End with an overall UX score and summary.`,
        models: ["ChatGPT", "Claude"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["uiux", "design", "product"]
      },
      {
        title: "SQL Query Generator",
        desc: "Generate optimized SQL queries with explanations.",
        prompt: `Generate an SQL query to solve the described database problem.
Use efficient joins, filters, and conditions where needed.
Explain the logic of the query in simple terms.
Suggest indexes to improve performance.
Mention potential performance bottlenecks for large datasets.
Provide an alternative query if applicable.
Ensure compatibility with common SQL databases.
Format the query for readability.`,
        models: ["ChatGPT", "Claude"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["sql", "database", "backend"]
      },
      {
        title: "Resume Enhancement Prompt",
        desc: "Turn resumes into impact-focused, recruiter-friendly versions.",
        prompt: `Rewrite the resume content to highlight measurable achievements.
Replace weak phrases with strong action-oriented statements.
Quantify impact using numbers wherever possible.
Optimize bullet points for ATS systems.
Improve clarity and structure of experience sections.
Suggest improvements for the summary section.
Tailor language for the desired job role.
Provide final polished output.`,
        models: ["ChatGPT", "Claude", "Gemini"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["resume", "career", "jobs"]
      },
      {
        title: "AI Image Prompt Generator",
        desc: "Create high-quality prompts for AI image models.",
        prompt: `Generate 5 highly detailed AI image prompts based on the given theme.
Include scene description, lighting, mood, and artistic style.
Mention camera angle, perspective, and composition details.
Add realism or artistic modifiers where appropriate.
Ensure prompts are optimized for image generation models.
Include a short negative prompt section.
Avoid banned or restricted terms.
Format prompts clearly.`,
        models: ["Midjourney", "ChatGPT"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["image", "ai-art", "prompt"]
      },
      {
        title: "Medical Symptom Analyzer",
        desc: "Non-diagnostic health insight and guidance.",
        prompt: `Analyze the symptoms provided by the user carefully.
Suggest possible non-diagnostic conditions based on patterns.
Explain the reasoning behind each possibility.
Recommend which medical specialist to consult.
Differentiate between mild and severe symptoms.
Include general lifestyle or precautionary advice.
Add clear disclaimers about medical limitations.
Highlight urgent warning signs.`,
        models: ["ChatGPT", "Claude"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["health", "medical", "symptoms"]
      },
      {
        title: "Research Paper Summarizer",
        desc: "Simplify academic research into clear insights.",
        prompt: `Summarize the provided research paper clearly.
Identify the main objective and research question.
Explain the methodology in simple terms.
Highlight key findings and conclusions.
Mention limitations or assumptions.
Provide real-world applications of the research.
Include a concise bullet-point summary.
Keep the tone academic but readable.`,
        models: ["ChatGPT", "Claude", "Perplexity"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["research", "academics", "summary"]
      },
      {
        title: "Professional Email Generator",
        desc: "Write polished, purpose-driven professional emails.",
        prompt: `Draft a professional email based on the user's intent.
Create a clear subject line and structured body.
Maintain polite and concise language.
Adjust tone based on context (formal or semi-formal).
Avoid unnecessary filler and repetition.
Offer an alternative shorter version.
Include professional sign-off suggestions.
Ensure grammatical accuracy.`,
        models: ["ChatGPT", "Claude", "Gemini"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["email", "communication", "professional"]
      },
      {
        title: "Daily Habit Planner",
        desc: "Build sustainable daily habits with structure.",
        prompt: `Create a personalized daily habit plan for the user.
Organize habits into morning, afternoon, and evening routines.
Align habits with the user’s goals and lifestyle.
Use proven habit-building techniques.
Suggest reminders and accountability methods.
Include flexibility for busy days.
Add motivation tips and progress tracking.
Present the plan clearly.`,
        models: ["ChatGPT", "Gemini"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["productivity", "habits", "self-improvement"]
      },
      {
        title: "Bug Report Analyzer",
        desc: "Turn bug reports into actionable engineering tasks.",
        prompt: `Analyze the reported bug in detail.
Identify the root cause clearly.
Explain expected behavior versus actual behavior.
Write clear reproduction steps.
Suggest a reliable fix with reasoning.
Mention potential side effects of the fix.
Assign a severity level.
Recommend prevention strategies.`,
        models: ["ChatGPT", "Claude", "Grok"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["bug", "engineering", "qa"]
      },
      {
        title: "Instagram Caption Creator",
        desc: "Generate engaging captions optimized for reach.",
        prompt: `Generate 10 Instagram captions based on the photo description.
Vary tone between fun, aesthetic, and motivational.
Keep captions concise and scroll-stopping.
Add optional emoji variations.
Suggest relevant hashtags grouped by niche.
Optimize captions for engagement.
Include CTA suggestions like questions.
Provide carousel caption ideas.`,
        models: ["ChatGPT", "Gemini"],
        authorId: "01f3faf0-ee3a-4632-a62d-a7e08e03a286",
        tags: ["instagram", "social-media", "creator"]
      }
    ]
  });

  console.log("🌱 Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
