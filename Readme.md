# AI Travel Copilot

## Overview

AI Travel Copilot is an AI-powered travel planning workspace built using:

- PydanticAI
- AG-UI inspired workflow architecture
- FastAPI
- Next.js
- Human-in-the-loop (HITL) workflows
- Structured AI outputs
- Session-based travel planning

The application is not just a chatbot. It is designed as an AI workflow orchestration system where:

- AI suggests travel plans
- Humans approve/reject checkpoints
- AI continues planning based only on approved decisions
- Sessions persist locally
- Users can pin, wishlist, and manage conversations

---

# Core Features

## AI Travel Planning
- Intelligent travel itinerary generation
- Packing recommendations
- Weather-aware suggestions
- Budget planning
- Meal recommendations
- Travel safety tips

---

## Human-in-the-Loop Workflow
Users remain the final decision makers.

AI generates:
- Travel checkpoints
- Suggested plans
- Optimized workflows

Users can:
- Approve checkpoints
- Reject checkpoints
- Continue planning only with selected steps

This architecture follows AG-UI inspired workflow orchestration principles.

---

## Session Management
The application supports:
- Multiple chats
- Persistent chat history
- Active sessions
- Chat switching
- Local storage persistence

---

## Chat Organization
Users can:
- Pin important chats
- Add chats to wishlist
- Delete chats
- Organize travel planning workflows

---

## Modern AI Workspace UI
The UI is inspired by:
- ChatGPT
- Claude
- Sarvam AI
- Perplexity
- Modern AI copilots

Features:
- Sidebar navigation
- Workspace architecture
- AI workflow cards
- Dynamic onboarding
- Interactive approval systems

---

# Technology Stack

## Frontend
- Next.js
- React
- TypeScript
- TailwindCSS
- Lucide React Icons
- Axios

---

## Backend
- FastAPI
- PydanticAI
- Gemini API
- Python

---

## AI Workflow Architecture
- Structured outputs
- Checkpoint orchestration
- HITL workflows
- Stateful session planning
- Multi-stage AI refinement

---

# Folder Structure

```bash
TourPlanner/
│
├── backend/
│   ├── main.py
│   ├── agent.py
│   ├── schemas/
│   │   └── trip_schema.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── styles/
│   ├── package.json
│   └── next.config.ts
│
└── README.md
```

---

# System Architecture

```text
Frontend (Next.js)
        ↓
Axios API Requests
        ↓
FastAPI Backend
        ↓
PydanticAI Agent
        ↓
Gemini API
        ↓
Structured AI Responses
        ↓
Human Approval Workflow
```

---

# Frontend Architecture

## Sidebar
The sidebar supports:
- New chat creation
- Chat history
- Wishlist chats
- Pinned chats
- Session navigation

---

## Chat Workspace
The workspace supports:
- Dynamic travel planning
- Interactive checkpoint rendering
- AI workflow continuation
- Timeline-based rendering

---

## Checkpoint System
The checkpoint workflow allows:
- AI-generated suggestions
- Human approvals
- Human rejections
- AI continuation based on approved decisions

---

# Backend Architecture

## FastAPI
FastAPI handles:
- API endpoints
- Request validation
- AI orchestration
- Workflow continuation

---

## PydanticAI
PydanticAI is used for:
- Structured AI outputs
- Typed schemas
- Reliable response validation
- Agent orchestration

---

## Gemini Integration
Gemini powers:
- Travel planning
- Intelligent suggestions
- Workflow refinement
- Multi-stage planning

---

# AI Workflow Flow

## Initial Prompt

Example:
```text
Plan a 5-day winter trip to Manali
```

---

## AI Response
The AI generates:
- Destination summary
- Packing checklist
- Checkpoints
- Travel tips
- Budget recommendations

---

## Human Approval
The user selects:
- Approved checkpoints
- Rejected checkpoints

---

## Workflow Continuation
The frontend sends approved checkpoints back to backend.

The AI:
- Refines plans
- Generates optimized suggestions
- Continues only with approved travel decisions

---

# Human-in-the-Loop Design

This application follows HITL architecture.

## AI Role
- Suggest
- Recommend
- Optimize

## Human Role
- Decide
- Approve
- Reject
- Control workflow

The human remains the final authority.

---

# API Endpoints

## POST `/chat`

Initial AI travel planning endpoint.

### Request
```json
{
  "message": "Plan a trip to Manali"
}
```

---

## POST `/continue-trip`

Continues workflow based on approved checkpoints.

### Request
```json
{
  "destination": "Manali",
  "approved_steps": [
    "Visit Solang Valley",
    "Explore Mall Road"
  ]
}
```

---

# Local Development Setup

## Backend Setup

### Create Virtual Environment
```bash
python -m venv venv
```

---

### Activate Environment

Windows:
```bash
venv\Scripts\activate
```

Linux/Mac:
```bash
source venv/bin/activate
```

---

### Install Dependencies
```bash
pip install -r requirements.txt
```

---

### Create `.env`
```env
GEMINI_API_KEY=your_api_key
```

---

### Start Backend
```bash
uvicorn main:app --reload
```

Backend URL:
```text
http://127.0.0.1:8000
```

---

# Frontend Setup

## Install Dependencies
```bash
npm install
```

---

## Install Required Packages
```bash
npm install axios lucide-react
```

---

## Start Frontend
```bash
npm run dev
```

Frontend URL:
```text
http://localhost:3000
```

---

# Deployment

## Frontend Deployment (Vercel)

### Environment Variable
```env
NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com
```

---

## Backend Deployment (Render)

### Build Command
```bash
pip install -r requirements.txt
```

### Start Command
```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

---

# Important Deployment Notes

## CORS
Backend must allow frontend domain.

Example:
```python
allow_origins=[
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app",
]
```

---

## Environment Variables
Production environments do not use local `.env` files automatically.

Add variables manually in:
- Render
- Vercel

---

# Current Features

## Completed
- AI travel planning
- PydanticAI integration
- Structured outputs
- HITL checkpoints
- Chat persistence
- Sidebar management
- Pin/wishlist system
- Session management
- Modern UI
- Deployment-ready architecture

---

# Future Improvements

## Planned Upgrades
- Supabase/PostgreSQL integration
- Authentication system
- Real-time streaming responses
- Weather APIs
- Maps integration
- Flight recommendations
- Hotel search
- AI memory system
- Search chats
- Rename chats
- Folder system
- Dark mode
- Multi-device synchronization

---

# Key Learning Outcomes

This project demonstrates:
- AI workflow architecture
- Human-in-the-loop systems
- Full-stack AI engineering
- PydanticAI usage
- State management
- Multi-session systems
- SaaS UI architecture
- Agent orchestration
- Production deployment concepts

---

# Why This Project Matters

Most beginner AI projects are:
- Simple chatbots
- Prompt wrappers
- Static AI apps

This project demonstrates:
- Workflow orchestration
- Human-guided AI systems
- Stateful planning
- Interactive AI collaboration
- Structured AI architecture

This makes the project significantly more advanced than standard AI chatbot projects.

---

# Author

Mayank Meghwal

AI Engineer / Full Stack AI Developer

---

# License

This project is for educational and portfolio purposes.
