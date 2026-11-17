# Catbot 🤖🐱

An AI cat assistant built for the **Reflex AI Chatbot Challenge**. Catbot helps users explore their cats' behaviour through a conversational interface, with a playful personality and the occasional "Meow".

The challenge combines a chatbot with database persistence: responses stream from OpenAI, while user messages and completed bot responses are stored in Postgres.

## Features

- A welcome screen that asks for your name and a personalised greeting.
- Streaming responses powered by OpenAI's `gpt-3.5-turbo` model.
- Message storage through `@vercel/postgres`.
- Chat avatars, automatic scrolling, and an error message when a request fails.
- Component tests using Jest and React Testing Library.

## Tech stack

| Area | Technology |
| --- | --- |
| Application | Next.js 14 (App Router), React 18, TypeScript |
| AI integration | OpenAI SDK and Vercel AI SDK 3 |
| Database | Postgres via `@vercel/postgres` |
| UI | [Gestalt](https://gestalt.pinterest.systems/home) and CSS |
| Testing | Jest and React Testing Library |

## Run locally

### 1. Install dependencies

You will need Node.js and npm. The pinned Next.js version requires Node.js **18.17 or later**.

From the repository root:

```bash
cd chatbot
npm ci
```

### 2. Configure environment variables

Create a `.env.local` file inside `chatbot/`:

```dotenv
OPEN_AI_API_KEY=your-openai-api-key
POSTGRES_URL=your-pooled-postgres-connection-string
```

- **`OPEN_AI_API_KEY`**: an [OpenAI API key](https://platform.openai.com/api-keys) with access to the model configured in `chatbot/src/app/api/chat/route.ts`. The code currently uses `gpt-3.5-turbo`.
- **`POSTGRES_URL`**: the pooled connection string for a database compatible with `@vercel/postgres`. Use the value supplied by your database provider.

Use the exact variable name `OPEN_AI_API_KEY`, as expected by this project. Keep credentials in local environment files, which are ignored by Git. If you already have a `chatbot/.env.development.local` file, update its values too: it takes precedence over `.env.local` during development.

The chat endpoint attempts to create the `catbot` table on the first request. The database credentials need permission to create tables and insert rows; no separate migration command is required.

### 3. Start the app

Run from `chatbot/`:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000), enter your name, and press **Enter** to start chatting.

## Available commands

Run all commands from `chatbot/`.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm start` | Serve the production build after running `npm run build`. |
| `npm run lint` | Run the configured Next.js lint checks. |
| `npm test` | Run Jest with coverage reporting. |

## How it works

1. The welcome screen collects a display name, which is kept in React state.
2. The chat interface uses the AI SDK's `useChat` hook to send the current conversation to `POST /api/chat`.
3. The API route adds Catbot's system prompt and requests a streaming completion from OpenAI.
4. Stream callbacks save the latest user message and the completed bot response to the `catbot` table.

The table contains `role` and `message` columns. Bot responses are currently stored with the role `system`.

Messages are saved to the database, but the app does not load previous conversations. Reloading the page starts a new chat. There is no authentication or user/session identifier in the stored messages; the display name only personalises the interface.

## Project structure

```text
chatbot/
├── public/robot.png               # Catbot avatar
├── src/app/
│   ├── api/chat/route.ts          # OpenAI streaming endpoint
│   ├── components/
│   │   ├── Welcome/              # Name entry form and tests
│   │   ├── ChatBox/              # Chat interface and tests
│   │   └── Main/                 # Welcome/chat screen state
│   ├── lib/queries.ts            # Table creation and message inserts
│   ├── layout.tsx                # App layout
│   └── page.tsx                  # Entry page
└── package.json                  # Dependencies and scripts
```

## Credits

Created by **Vicky Suarez** for the Reflex AI Chatbot Challenge.

- Catbot avatar: [Colored Robot Cat from Flaticon](https://www.flaticon.com/free-icon/robot_739857?term=cat+robot&page=1&position=25&origin=search&related_id=739857).

Feedback is always welcome <3
