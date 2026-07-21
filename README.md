# Self-Correcting Retrieval-Augmented Generation (RAG) System

A production-ready agentic RAG application built for engineering-focused hackathons and presentations. 

Unlike standard RAG pipelines, this system implements an agentic correction loop. It parses uploaded PDF documents, creates semantic vector embeddings, indices them using ChromaDB, and performs queries. Upon retrieval, a **Critic Agent** evaluates the context. If the context is deemed insufficient to answer the query truthfully, a **Query Reformulator Agent** expands the query to search for missing details. If information is still missing, the system generates **polite clarification questions** rather than hallucinating.

---

## Technical Architecture

```
                                    User Question
                                          │
                                          ▼
                      ┌──────────────────────────────────────┐
                      │    Vector DB: ChromaDB Retrieval     │
                      └──────────────────────────┬───────────┘
                                                 │
                                                 ▼
                      ┌──────────────────────────────────────┐
                      │    Critic Agent: Context Assessment  │
                      └──────────────────┬───────────────────┘
                                         │
                                 Is Context Sufficient?
                                 /                  \
                             [Yes]                  [No]
                              /                        \
                             ▼                          ▼
               ┌─────────────────────────┐  ┌─────────────────────────┐
               │ Final Answer Generator  │  │   Query Reformulator    │
               │    (with Citations)     │  │   (Search Expansion)    │
               └─────────────┬───────────┘  └───────────┬─────────────┘
                             │                          │
                             │                          ▼
                             │              ┌─────────────────────────┐
                             │              │   Secondary Retrieval   │
                             │              └───────────┬─────────────┘
                             │                          │
                             │                          ▼
                             │              ┌─────────────────────────┐
                             │              │  Final Re-Evaluation    │
                             │              └───────────┬─────────────┘
                             │                          │
                             │                  Is Context Sufficient?
                             │                  /                  \
                             │              [Yes]                  [No]
                             │               /                        \
                             ▼              ▼                          ▼
                         [Return]    ┌──────────────┐          ┌──────────────┐
                            ▲        │ Final Answer │          │Clarification │
                            └────────┤(with Sources)│          │   Request    │
                                     └──────────────┘          └──────────────┘
```

---

## Tech Stack & Rationale

*   **Frontend**: React (Vite) + Vanilla CSS. Styled using a custom design system token mimicking Notion, Stripe, and Vercel dashboards. Simple, light neutral tone, layout grids, and visual flowcharts showing agent traces.
*   **Backend**: Python + FastAPI. Fast asynchronous service execution, automatic Swagger UI docs (`/docs`), and robust python libraries for file extraction.
*   **Vector Database**: ChromaDB. Industry-standard vector database running in-process (PersistentClient) to ensure zero installation overhead.
*   **LLM & Embeddings**: Google Gemini API (`gemini-2.5-flash` and `text-embedding-004`). Huge context windows, high speed, and low latency.
*   **PDF Extraction**: `pypdf`. Clean page-by-page token extraction.

---

## Folder Structure

```
self-correcting-rag/
├── backend/
│   ├── app/
│   │   ├── api/          # Chat and Document API routers
│   │   ├── models/       # Pydantic schema representations
│   │   ├── services/     # Core services (PDF, Embeddings, Chroma, Pipeline)
│   │   ├── config.py     # Settings loader (dotenv)
│   │   └── main.py       # FastAPI server entry point
│   ├── tests/            # API & Pipeline test scripts
│   ├── Dockerfile
│   ├── requirements.txt
│   └── run.py            # Local uvicorn execution wrapper
├── frontend/
│   ├── src/
│   │   ├── components/   # Sidebar and Shared layout widgets
│   │   ├── pages/        # Dashboard, Documents, Chat, Evaluation, Settings
│   │   ├── App.jsx       # Layout orchestrator
│   │   ├── main.jsx      # React entrypoint
│   │   └── index.css     # Light theme SaaS styling rules
│   ├── index.html
│   ├── vite.config.js    # Vite configuration & proxy configuration
│   ├── package.json
│   ├── nginx.conf        # Production proxy server config
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Local Development Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- Google Gemini API Key

### 2. Backend Setup
1. Open a terminal in the `./backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables. Create a `.env` file in the root of the project:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Run the dev server:
   ```bash
   python run.py
   ```
   The backend will start at `http://localhost:8000`. You can inspect the interactive OpenAPI docs at `http://localhost:8000/docs`.

### 3. Frontend Setup
1. Open a terminal in the `./frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Vite will host the frontend at `http://localhost:5173`. Any API calls to `/api/*` are proxied to `http://localhost:8000` automatically.

---

## Deployment (Docker Compose)

The entire application can be built and deployed in a single command using Docker.

1. Ensure Docker and Docker Desktop are running on your machine.
2. In the root directory of the project, verify that the `.env` file exists and has your `GEMINI_API_KEY`.
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. Open your browser and navigate to:
   - Frontend app: `http://localhost:80`
   - Backend OpenAPI Docs: `http://localhost:8000/docs`

---

## Verification Plan (For Judges & Presenters)

1.  **Ingestion Verification**:
    - Navigate to the **Documents** page.
    - Drag and drop or select a sample PDF (e.g. a technical system manual).
    - Watch the status badge. It will change to "Active" once text is chunked and loaded into ChromaDB.
2.  **Standard Retrieval Verification**:
    - Open the **Chat Playground** page.
    - Ask a question directly related to your PDF (e.g., "What is the operating threshold?").
    - The assistant returns a direct answer containing inline citations like `[manual.pdf, Page 3]`.
3.  **Self-Correction Verification**:
    - Enable **Developer Mode** in the sidebar.
    - Ask a question requiring information from two separate parts of the PDF, or using synonyms.
    - Observe the **Agent Trace Panel** on the right. You will see:
      - Attempt 1 fetching chunks.
      - Critic Agent outputting JSON showing `is_sufficient: false` with missing details.
      - Query Reformulator Agent expanding the query.
      - Attempt 2 fetching supplementary chunks.
      - Critic re-evaluating and generating the final complete answer.
4.  **Flow Chart Evaluation**:
    - Go to the **Evaluation & Flow** page.
    - Select your query from the history list.
    - Inspect the vertical node flowchart mapping every decision (Embeddings, Chroma scores, Critic evaluation, Reformulation, Re-evaluation, citations) in a clear visual timeline.
5.  **Clarification Fallback**:
    - Ask an out-of-scope question (e.g. "What is the weather in London?").
    - The critic will rate it as insufficient. The system will issue a polite message outlining what it knows vs what is missing, accompanied by 2-3 specific clarification questions.
