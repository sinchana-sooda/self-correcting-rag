from fastapi import APIRouter, HTTPException
from typing import List

from app.models.schemas import QueryRequest, QueryResponse
from app.services.rag_pipeline import rag_pipeline

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query_rag(request: QueryRequest):
    """
    Execute a query against the Self-Correcting RAG pipeline.
    Runs retrieval, Critic assessment, query reformulation, and returns the full execution trace.
    """
    try:
        print("🔥 CHAT.PY WAS CALLED 🔥")
        trace = rag_pipeline.query(request.query, request.k)
        return QueryResponse(**trace)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing RAG query: {str(e)}")

@router.get("/history", response_model=List[QueryResponse])
async def get_query_history():
    """
    Get the list of previously executed queries and their evaluation traces.
    """
    try:
        return rag_pipeline.get_history()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching query history: {str(e)}")

@router.post("/history/clear")
async def clear_query_history():
    """
    Clear all search query logs.
    """
    try:
        rag_pipeline.clear_history()
        return {"status": "success", "message": "Query history cleared."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing history: {str(e)}")
