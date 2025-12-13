# 🚀 Qure - The Prompt Library That Doesn't Judge Your AI Obsession

> *"Curated prompt systems for thinkers and makers"* — because sometimes you need that perfect prompt to make ChatGPT understand your existential crisis at 3 AM.

![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.1.0-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql)

---

## 🎯 What in the World is Qure?

Qure is your friendly neighborhood prompt library where AI enthusiasts, developers, and creative minds come together to share, discover, and steal (we mean, *borrow*) the best prompts for your favorite AI models.

Think of it as **GitHub for prompts**, but with less drama and more emojis. ✨

### 🤖 Supported AI Models

We're polyamorous when it comes to AI models. Currently flirting with:

- 🤖 **ChatGPT** - The OG that started it all
- 🧠 **Claude** - Anthropic's brainy child
- 💎 **Gemini** - Google's shiny new toy
- 🚀 **Grok** - X's rebellious AI
- 🔍 **Perplexity** - The research nerd
- 🎨 **Midjourney** - The artist in the family

---

## ✨ Features That Make You Go "Ooh!"

- 🔍 **Smart Search** - Find prompts faster than you can say "AI takeover"
- 📝 **Add Your Own** - Share your prompt masterpieces with the world
- 🏷️ **Tag System** - Organize chaos with beautiful tags
- 👁️ **View Tracking** - See which prompts are getting all the attention
- 🎨 **Beautiful UI** - Because life's too short for ugly interfaces
- 🌓 **Dark Mode** - For those late-night prompt crafting sessions
- 🔐 **Authentication** - Sign up with Google or email (your choice, we don't judge)
- 📱 **Responsive** - Works on your phone, tablet, and that ancient laptop

---

## 🛠️ Tech Stack (The Boring But Important Part)

| Category | Technology | Why We Love It |
|----------|-----------|----------------|
| **Framework** | Next.js 16 | Server components, baby! |
| **Language** | TypeScript | Type safety = fewer 3 AM bugs |
| **Database** | PostgreSQL | Reliable like your morning coffee |
| **ORM** | Prisma | Type-safe database queries |
| **Auth** | NextAuth.js | Authentication made less painful |
| **Styling** | Tailwind CSS | Utility-first, sanity-preserved |
| **Deployment** | Vercel | Deploy faster than you can blink |

---

## 🚦 Getting Started (The Fun Part)

### Prerequisites

Before you dive in, make sure you have:

- Node.js 18+ (we're not living in the past)
- npm, yarn, pnpm, or bun (pick your poison)
- PostgreSQL database (local or cloud, we're flexible)
- A sense of adventure 🏴‍☠️

### Installation

1. **Clone the repository** (or download it, we're not picky)
   ```bash
   git clone https://github.com/rookiemaniesh/qure-prompts.git
   cd qure-prompts
   ```

2. **Install dependencies** (this might take a coffee break ☕)
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up your environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/qure?schema=public"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-here"
   
   # Google OAuth (optional but recommended)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Generate Prisma Client** (because we need to talk to the database)
   ```bash
   npx prisma generate
   ```

5. **Run migrations** (set up your database tables)
   ```bash
   npx prisma migrate dev
   ```

6. **Seed the database** (optional, but adds some fun sample data)
   ```bash
   npx prisma db seed
   ```

7. **Start the development server** (the moment of truth!)
   ```bash
   npm run dev
   ```

8. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

   🎉 **Congratulations!** You're now running Qure locally. Time to add some prompts!

---

## 📁 Project Structure (For the Curious Minds)

```
qure-prompts/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (auth, prompts)
│   ├── add-prompt/        # Add new prompt page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── page.tsx           # Home page (the star of the show)
├── components/            # React components
│   ├── prompt-card.tsx    # Individual prompt cards
│   ├── prompt-grid.tsx    # Grid of prompts
│   ├── navbar.tsx         # Navigation bar
│   └── ...                # More components
├── lib/                   # Utility functions
│   ├── prisma.ts          # Prisma client instance
│   ├── authOptions.ts     # NextAuth configuration
│   └── validators.ts      # Zod schemas
├── prisma/                # Database stuff
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.ts            # Seed data
└── public/                # Static assets
    └── icons-model/       # AI model icons
```

---

## 🎮 Available Scripts

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start development server (with hot reload) |
| `npm run build` | Build for production (generates Prisma client first) |
| `npm run start` | Start production server |
| `npm run lint` | Lint your code (because we care about quality) |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Create and apply migrations |
| `npx prisma generate` | Generate Prisma Client |

---

## 🚢 Deployment

### Deploying to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy! 🚀

**Pro Tip:** The `postinstall` script automatically generates the Prisma client, so you don't have to worry about it!

### Environment Variables for Production

Make sure to set these in your Vercel project settings:

- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - A random secret string
- `GOOGLE_CLIENT_ID` - (Optional) For Google OAuth
- `GOOGLE_CLIENT_SECRET` - (Optional) For Google OAuth

---

## 🤝 Contributing

Found a bug? Have a feature idea? Want to add support for a new AI model?

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

We're friendly, we promise! 😊

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- All the amazing prompt creators in the community
- The Next.js team for making our lives easier
- Prisma for making database interactions less painful
- You, for reading this far! 🎉

---

## 💬 Questions? Comments? Existential Crises?

- Open an issue on GitHub
- Start a discussion
- Or just stare at the code until it makes sense (we've all been there)

---

## 🎨 Screenshots

*Coming soon!* (We're too busy adding features to take screenshots)

---

<div align="center">

**Made with ❤️ (and lots of ☕) by the Qure team**

*"Because the best prompts deserve the best home"*

⭐ Star this repo if you found it helpful!

</div>
