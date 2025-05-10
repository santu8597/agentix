
---

# 🤖 Agentix

**Agentix** is a flexible and extensible AI agent framework built with **Next.js** and **Vercel AI SDK**. It empowers developers and researchers to **build, test, and run AI agents** by combining custom prompts with dynamic tool execution — all in a sleek, browser-based interface.

Whether you're crafting a chatbot, autonomous agent, or a task-specific assistant, Agentix lets you wire up AI reasoning with real-world actions through pluggable tools.

---

## 🚀 Features

* ⚙️ **Dynamic Tool Execution** – Agents can call multiple real-world tools like web search, email, shell commands, and more.
* 💬 **Prompt Playground** – Craft, test, and iterate on AI prompts with live feedback.
* 🧩 **Selective Tool Use** – Activate only the tools you need per agent session.
* 📦 **Modular & Extensible** – Easily add or remove tools via clean interfaces.
* 🖥️ **Modern Tech Stack** – Built with Next.js, Tailwind, TypeScript, and the AI SDK.

---

## 🧰 Available Tools

| 🛠 Tool ID                | 🧠 Description                   | 🔣 Icon |
| ------------------------- | -------------------------------- | ------- |
| `getWeather`              | Fetch current weather data       | ☁️      |
| `executeShell`            | Run shell commands               | 🖥️     |
| `generateImage`           | Generate images with AI          | 🖼️     |
| `analyzeSrcStructureTool` | Analyze project folder structure | 📁      |
| `musicMood`               | Analyze music mood               | 🎵      |
| `sendEmail`               | Send emails via Gmail API        | 📤      |
| `readEmail`               | Read emails from Gmail inbox     | 📬      |
| `webSearch`               | Perform real-time web search     | 🌐      |
| `scrapeDocsTool`          | Scrape data from URLs or docs    | 🔍      |
| `fetchFlightDetails`      | Get live flight data             | ✈️      |
| `fetchYouTubeVideo`       | Interact with YouTube content    | 📺      |

> Tools are dynamically selected at runtime based on your configuration.

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/agentix.git
cd agentix
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Configure environment variables

Create a `.env.local` file with your API credentials:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-google-generative-ai-api-key
TAVILY_API_KEY=your-tavily-api-key
SERP_API_KEY=your-serp-api-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
CORSEL_API_KEY=your-corsel-api-key
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore Agentix.

---

## 🧠 How It Works

* You define an agent's prompt and message history.
* A UI lets you select from supported tools.
* The backend filters and passes selected tools to the AI engine.
* Tools can be invoked automatically by the model during conversations.

---

## 🔧 Code Snippet: Dynamic Tool Injection

```ts
const filteredTools = Object.fromEntries(
  array_tools.map(({ tool }) => [tool, allTools[tool]])
)
```

This allows agents to only access tools chosen for a given session.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS, Lucide Icons
* **AI SDK:** Vercel `ai`, `@ai-sdk/google`
* **Typing & Validation:** TypeScript, Zod
* **API Integrations:** Gmail, YouTube, OpenWeather, etc.

---

## 📌 Roadmap

* ✅ Multi-tool support with dynamic inclusion
* 🧠 Vector-based memory system
* 🔐 OAuth user accounts with agent configs
* 📜 Toolchain builder (multi-step workflows)
* 🪙 Export agents as NFT-powered assets

---

## 📄 License

MIT License. Fork freely, improve fearlessly, deploy confidently.

---

## 💡 Why Agentix?

Because building smart agents should be as flexible as your ideas.
**Agentix** is your home lab for testing real AI workflows — not just chat.

---

Let me know if you want a badge section or Vercel deploy button added too!
