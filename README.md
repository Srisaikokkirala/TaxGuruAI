# TaxGuru AI

TaxGuru AI is a professional MERN prototype for an Indian Income Tax assistant.

## What This Prototype Does

- ChatGPT-like dark UI
- Conversation history stored in MongoDB
- Modular backend so the LLM layer can be replaced later with RAG
- Dedicated LLM service only in `backend/src/services/llmService.js`
- Tax-focused assistant behavior with follow-up questions when details are missing

## Important Constraints Followed

- No RAG yet
- No vector database
- No FAISS
- No LangChain
- No embedding storage in MongoDB
- Only LLM API calls for conversational responses

## Folder Structure

```text
TaxGuru AI/
├─ README.md
├─ .gitignore
├─ backend/
│  ├─ package.json
│  ├─ .env.example
│  └─ src/
│     ├─ app.js
│     ├─ server.js
│     ├─ config/
│     │  ├─ constants.js
│     │  └─ db.js
│     ├─ controllers/
│     │  └─ chatController.js
│     ├─ middleware/
│     │  ├─ errorHandler.js
│     │  └─ notFound.js
│     ├─ models/
│     │  ├─ Chat.js
│     │  ├─ Message.js
│     │  └─ User.js
│     ├─ routes/
│     │  └─ chatRoutes.js
│     ├─ services/
│     │  ├─ chatHistoryService.js
│     │  └─ llmService.js
│     └─ utils/
│        ├─ chatTitle.js
│        └─ domainGuard.js
└─ frontend/
   ├─ package.json
   ├─ .env.example
   ├─ index.html
   ├─ vite.config.js
   ├─ postcss.config.js
   ├─ tailwind.config.js
   └─ src/
      ├─ App.jsx
      ├─ main.jsx
      ├─ index.css
      ├─ context/
      │  └─ ChatContext.jsx
      ├─ routes/
      │  └─ AppRouter.jsx
      ├─ services/
      │  ├─ apiClient.js
      │  └─ chatService.js
      ├─ hooks/
      │  ├─ useAutoScroll.js
      │  └─ useLocalStorage.js
      ├─ utils/
      │  ├─ content.js
      │  └─ formatDate.js
      ├─ components/
      │  ├─ chat/
      │  │  ├─ ChatComposer.jsx
      │  │  ├─ ChatWindow.jsx
      │  │  ├─ MarkdownRenderer.jsx
      │  │  ├─ MessageBubble.jsx
      │  │  ├─ SuggestedQuestions.jsx
      │  │  └─ TypingIndicator.jsx
      │  ├─ layout/
      │  │  ├─ Sidebar.jsx
      │  │  └─ TopBar.jsx
      │  └─ ui/
      │     ├─ Button.jsx
      │     ├─ Card.jsx
      │     ├─ Chip.jsx
      │     ├─ Skeleton.jsx
      │     └─ Toggle.jsx
      └─ pages/
         ├─ AboutPage.jsx
         ├─ ChatPage.jsx
         └─ HomePage.jsx
```

## Installation Commands

### Backend

```bash
cd "backend"
npm install
```

### Frontend

```bash
cd "frontend"
npm install
```

## Environment Variables

### Backend `.env`

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taxguru_ai
CORS_ORIGIN=http://localhost:5173
LLM_PROVIDER=grok
GROK_API_KEY=your_grok_api_key
GROK_BASE_URL=https://api.x.ai/v1
GROK_MODEL=grok-2-latest
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

### Frontend `.env`

Copy `frontend/.env.example` to `frontend/.env` and fill in:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=TaxGuru AI
```

## Run Commands

### Backend

```bash
cd "backend"
npm run dev
```

### Frontend

```bash
cd "frontend"
npm run dev
```

## API

### POST `/chat`

Request:

```json
{
  "message": "What is Section 80C?"
}
```

Response:

```json
{
  "reply": "..."
}
```

### Additional chat routes

- `GET /chats`
- `GET /chats/:chatId`
- `DELETE /chats/:chatId`
- `DELETE /chats`
- `PATCH /messages/:messageId/feedback`

## Notes

- The backend stores chats and messages in MongoDB using a demo user.
- The LLM layer is isolated in `backend/src/services/llmService.js` so you can replace it later with your own RAG pipeline.
- The UI supports markdown, code blocks, timestamps, copy, feedback, regenerate, and stop generation.
# TaxGuru
