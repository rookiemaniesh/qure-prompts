# ⚡ Qure: The "GitHub for Prompts" (But Faster & Better Looking)

> *"Find the perfect words to make AI do your bidding, before the robots take over."* 🤖

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Lovely-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Redis](https://img.shields.io/badge/Redis-Blazing%20Fast-red?style=for-the-badge&logo=redis)
![Upstash](https://img.shields.io/badge/Upstash-Powered-00E9A3?style=for-the-badge&logo=upstash)

---

## 🚀 Why Does This Exist?

Ever spent 45 minutes trying to get ChatGPT to write a poem without sounding like a greeting card? **We feel you.**

**Qure** is the playground where prompt engineers, tinkerers, and caffeine-fueled developers swap their best "magic spells" for LLMs. It's like StackOverflow, but for convincing AI to be useful.

### 🚄 Now with TURBO POWER (New!)
We just strapped a **Redis** engine to this bad boy (thanks **Upstash**!).
- **0.1s Load Times:** Because waiting is for 2023.
- **Smart Caching:** We remember the good stuff so your database doesn't have to.
- **Instant Updates:** Post a prompt, boom, it's live everywhere.

---

## 💎 The Goods (Features)

| Feature | Sarcastic Commentary |
|---------|----------------------|
| **🧠 Multi-Model Support** | Because we're prompt-polyamorous. GPT, Claude, Gemini, Grok... come one, come all. |
| **⚡ Redis Caching** | **NEW!** Your prompts load faster than you can blink. Literally. Try blinking. Too slow! |
| **🔍 Search & Filter** | Find that one prompt you saw last Tuesday at 2 AM. |
| **👁️ Analytics** | See how many people are "borrowing" your genius ideas. |
| **🌓 Dark Mode** | Protecting your retinas since day one. |
| **🔐 Safe Auth** | Google Login. No passwords to forget. |

---

## 🛠️ Under The Hood

We built this with the "S-tier" stack. No jQuery here, grandpa.

- **Framework:** [Next.js 16](https://nextjs.org/) (Bleeding edge, because we like to live dangerously)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (We prefer our errors at compile time, NOT runtime)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Reliable, classic, indestructible)
- **Caching:** [Upstash Redis](https://upstash.com/) (Speed. I am speed.)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Writing actual CSS is so 2015)
- **ORM:** [Prisma](https://www.prisma.io/) (SQL is hard, Prisma is easy)

---

## 🏁 Get This Running (3 Minutes or Less)

### 1. Steal the Code
```bash
git clone https://github.com/rookiemaniesh/qure-prompts.git
cd qure-prompts
```

### 2. Install the Goods
```bash
npm install
# or 'yarn' if you're feeling fancy, or 'pnpm' if you care about disk space
```

### 3. The Secret Sauce (.env)
Create a `.env` file. Do not share it. Do not pass go.
```env
# Database (The Brain)
DATABASE_URL="postgresql://user:pass@localhost:5432/qure"

# Auth (The Bouncer)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="slam-your-keyboard-here-to-generate-random-string"

# Caching (The Turbo Button) - NEW! 🚀
UPSTASH_REDIS_REST_URL="https://your-db.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# Optional: Google Auth (If you want to login)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 4. Ignite!
```bash
# Generate the DB client
npx prisma generate

# create the tables
npx prisma migrate dev

# Start the engines
npm run dev
```

Visit `http://localhost:3000` and marvel at your creation.

---

## 🤝 Want to Help?

Found a bug? Want to add a "Make Coffee" prompt button?
1. Fork it.
2. Fix it.
3. PR it.
4. We hug you (digitally).

---

<div align="center">

**Built with ❤️, ☕, and a little bit of panic by the Qure Team**

*"May your tokens be cheap and your context windows be large."*

</div>
