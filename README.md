# Self-Correcting Retrieval-Augmented Generation (RAG) System

A production-ready agentic Retrieval-Augmented Generation (RAG) application designed for engineering-focused hackathons and AI-powered document intelligence.

The system combines semantic retrieval with Large Language Models (LLMs) to answer questions from uploaded PDF documents. It is architected around a **self-correcting retrieval pipeline** that evaluates retrieved context, reformulates queries when necessary, and minimizes hallucinations through iterative retrieval.

> **Note:** The repository contains the complete self-correcting RAG pipeline implementation. The deployed demo currently showcases document upload and management. The conversational workflow depends on Gemini API integration, which encountered deployment-related API issues during the final deployment.

---

# Problem Statement

Traditional document question-answering systems frequently generate incorrect answers when insufficient context is retrieved. Standard RAG systems often rely on a single retrieval attempt, increasing the likelihood of hallucinations.

Safe Supply AI addresses this challenge by introducing an agentic retrieval pipeline capable of evaluating retrieval quality before generating responses.

---

# Proposed Solution

The application follows a multi-stage retrieval workflow:

- Upload engineering or technical PDF documents
- Extract and chunk document content
- Generate semantic embeddings
- Store embeddings for retrieval
- Retrieve relevant context for a user query
- Critically evaluate retrieved context
- Reformulate the search query when context is insufficient
- Perform secondary retrieval
- Generate grounded responses with citations
- Request clarification instead of hallucinating when necessary

---

# Technical Architecture

```
                                    User Question
                                          │
                                          ▼
                      ┌──────────────────────────────────────┐
                      │    Vector DB Retrieval               │
                      └──────────────────────────┬───────────┘
                                                 │
                                                 ▼
                      ┌──────────────────────────────────────┐
                      │      Critic Agent                    │
                      │  Context Sufficiency Evaluation      │
                      └──────────────────┬───────────────────┘
                                         │
                                 Is Context Sufficient?
                                 /                  \
                             Yes                    No
                              │                      │
                              ▼                      ▼
                  Generate Final Answer      Query Reformulator
                              │                      │
                              │                      ▼
                              │             Secondary Retrieval
                              │                      │
                              ▼                      ▼
                      Final Response      Re-Evaluate Context
                                                 │
                                     Context Still Insufficient?
                                             │
                                   Clarification Questions
```

---

# Core Components

## Document Processing

- PDF extraction
- Intelligent text chunking
- Metadata preservation

## Semantic Retrieval

- Vector embedding generation
- Similarity search
- Context ranking

## Critic Agent

Evaluates:

- Context relevance
- Information completeness
- Confidence
- Sufficiency for answer generation

## Query Reformulator

If retrieval quality is poor:

- Expands keywords
- Introduces semantic alternatives
- Improves retrieval coverage
- Initiates a second retrieval attempt

## Clarification Flow

When sufficient evidence still cannot be retrieved, the assistant requests clarification instead of generating unsupported information.

---
# Screenshots


# DASHBOARD

  
<img width="1920" height="1020" alt="Screenshot 2026-07-22 173217" src="https://github.com/user-attachments/assets/5ffe66cb-147c-4e83-9b99-5fe55d628850" />


# DOCUMENTS PAGE


<img width="1920" height="1020" alt="Screenshot 2026-07-22 173246" src="https://github.com/user-attachments/assets/35abb9cd-acb0-4d74-8724-eac3453e5431" />


# CHAT PLAYGROUND


<img width="1920" height="1020" alt="Screenshot 2026-07-22 175217" src="https://github.com/user-attachments/assets/6768b984-6487-4b9b-bdba-76d82f5fc7ed" />


# EVALUATION


<img width="1920" height="1020" alt="Screenshot 2026-07-22 175232" src="https://github.com/user-attachments/assets/8970d309-916c-4bb2-88ad-1bc998fbaa45" />


# SETTINGS


<img width="1920" height="1020" alt="Screenshot 2026-07-22 175239" src="https://github.com/user-attachments/assets/6a5ac99d-1ea5-40d6-bd46-ab4d53bdd7e5" />


# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- CSS

## Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

## AI

- Google Gemini API
- Gemini Flash Model
- text-embedding model

## Vector Database

- ChromaDB

## PDF Processing

- PyPDF

---

# Folder Structure

```
backend/
    app/
        api/
        services/
        models/
        config.py
        main.py

frontend/
    src/
        components/
        pages/
        App.jsx
        main.jsx

README.md
```

---

# Local Setup

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python run.py
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Environment Variables

```
GEMINI_API_KEY=YOUR_API_KEY
```

---

# Deployment

## Frontend

**Vercel**

```
https://self-correcting-rag-eta.vercel.app/
```

## Backend

**Render**

```
https://self-correcting-rag-il1o.onrender.com
```

## API Documentation

```
https://self-correcting-rag-il1o.onrender.com/docs
```

---

# Current Status

### Successfully Implemented

- PDF upload
- Backend API
- FastAPI architecture
- React dashboard
- Document management
- Modular RAG pipeline
- ChromaDB integration
- Gemini integration layer
- Critic Agent architecture
- Query Reformulator architecture
- Clarification workflow
- Evaluation pipeline

### Deployment Note

The conversational retrieval pipeline is implemented in the backend architecture. During final deployment, the Gemini API integration encountered deployment-specific issues, preventing live demonstration of the chat workflow. The document ingestion and overall application architecture remain functional.

---

# Challenges Faced

- Building an agentic RAG architecture
- Designing multi-stage retrieval logic
- Integrating FastAPI with React
- Managing vector search using ChromaDB
- Google Gemini API integration
- Frontend-backend deployment on Vercel and Render
- Environment variable configuration
- Debugging deployment-specific API issues

---

# Future Enhancements

- Multi-document reasoning
- Streaming responses
- Better citation visualization
- Authentication
- User workspaces
- Retrieval evaluation dashboard
- Advanced agent orchestration
- Production monitoring

---

# Team

Developed as an AI-powered engineering hackathon project demonstrating modern Retrieval-Augmented Generation using FastAPI, React, ChromaDB, and Google's Gemini API.
