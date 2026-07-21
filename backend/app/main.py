from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.config import settings
from app.api.documents import router as documents_router
from app.api.chat import router as chat_router

app = FastAPI(
    title="Self-Correcting RAG API",
    description="Backend API supporting Document Upload, ChromaDB Indexing, and Critic-Loop Self-Correcting Retrieval-Augmented Generation.",
    version="1.0.0"
)

# Set up CORS so the Vite React frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict this. For hackathon, allow all.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(documents_router, prefix="/api/documents", tags=["Documents"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "message": "Self-Correcting RAG API is operational.",
        "docs_url": "/docs"
    }

# Mount uploads directory to serve files if needed (e.g. for previewing PDFs in the UI)
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/api/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")
