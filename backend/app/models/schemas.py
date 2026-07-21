from pydantic import BaseModel
from typing import List, Optional, Any

class QueryRequest(BaseModel):
    query: str
    k: Optional[int] = 4

class ChunkSchema(BaseModel):
    id: str
    text: str
    source: str
    page: int
    score: float

class RetrievalAttemptSchema(BaseModel):
    attempt: int
    query_used: str
    chunks: List[ChunkSchema]

class CriticEvaluationSchema(BaseModel):
    is_sufficient: bool
    confidence_score: float
    missing_information: str
    reasoning: str

class QueryResponse(BaseModel):
    query: str
    timestamp: float
    model_used: str
    embedding_model: str
    retrieval_attempts: List[RetrievalAttemptSchema]
    critic_evaluations: List[CriticEvaluationSchema]
    reformulated_query: Optional[str] = None
    final_action: str  # "answer" or "clarification"
    response: str
    latency_ms: int
    tokens_used: int

class DocumentInfo(BaseModel):
    filename: str
    chunk_count: int
    file_size_bytes: int
    upload_time: float
