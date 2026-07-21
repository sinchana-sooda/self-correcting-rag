from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import time
import json
from typing import List

from app.config import settings
from app.services.document_processor import document_processor
from app.services.embedding_service import embedding_service
from app.services.vector_db import vector_db
from app.models.schemas import DocumentInfo

router = APIRouter()

# JSON metadata path for tracked files
METADATA_FILE = os.path.join(os.path.dirname(settings.UPLOAD_DIR), "uploaded_documents.json")

def load_metadata() -> dict:
    if not os.path.exists(METADATA_FILE):
        return {}
    try:
        with open(METADATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {}

def save_metadata(meta: dict):
    try:
        with open(METADATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(meta, f, indent=2)
    except Exception as e:
        print(f"Error saving document metadata: {e}")

@router.post("/upload", response_model=DocumentInfo)
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a PDF document, extract pages, chunk content, generate embeddings,
    and index them in ChromaDB.
    """
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF documents are supported.")
    
    # Secure filename and save to local uploads directory
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)
    
    try:
        # Save file to disk
        file_bytes = await file.read()
        file_size = len(file_bytes)
        
        with open(file_path, "wb") as f:
            f.write(file_bytes)
            print("✅ File saved")
            
        # Process and chunk PDF
        chunks = document_processor.extract_and_chunk(file_path, file.filename)
        print("✅ PDF processed")
        
        if not chunks:
            # Clean up empty file
            if os.path.exists(file_path):
                os.remove(file_path)
            raise HTTPException(status_code=400, detail="Could not extract any readable text from the PDF.")
        
        # Prepare inputs for indexing
        texts = [chunk["text"] for chunk in chunks]
        metadatas = [chunk["metadata"] for chunk in chunks]
        ids = [f"{file.filename}_c{chunk['metadata']['chunk_idx']}_p{chunk['metadata']['page']}" for chunk in chunks]
        
        # Generate embeddings (batched)
        embeddings = embedding_service.get_embeddings_batch(texts)
        print("✅ Embeddings generated")
        
        # Add to vector store
        vector_db.add_chunks(
            texts=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids
        )
        print("✅ Stored in ChromaDB")
        
        # Save tracking metadata
        doc_meta = load_metadata()
        doc_info = {
            "filename": file.filename,
            "chunk_count": len(chunks),
            "file_size_bytes": file_size,
            "upload_time": time.time()
        }
        doc_meta[file.filename] = doc_info
        save_metadata(doc_meta)
        
        return DocumentInfo(**doc_info)
        
    except Exception as e:
        # Clean up files on exception
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

@router.get("", response_model=List[DocumentInfo])
async def list_documents():
    """
    List all uploaded documents and their details.
    """
    doc_meta = load_metadata()
    indexed_docs = vector_db.get_all_documents()
    
    # Return metadata only for documents that actually exist in the Chroma DB index
    results = []
    for filename in indexed_docs:
        if filename in doc_meta:
            results.append(DocumentInfo(**doc_meta[filename]))
        else:
            # Sync metadata if it was added elsewhere
            dummy_info = {
                "filename": filename,
                "chunk_count": 0,
                "file_size_bytes": 0,
                "upload_time": time.time()
            }
            results.append(DocumentInfo(**dummy_info))
            
    return results

@router.delete("/{filename}")
async def delete_document(filename: str):
    """
    Delete a document from ChromaDB index and clean up its file on disk.
    """
    # Delete from vector database
    vector_db.delete_document(filename)
    
    # Delete file from local storage
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error removing file from disk: {e}")
            
    # Remove from tracking metadata
    doc_meta = load_metadata()
    if filename in doc_meta:
        del doc_meta[filename]
        save_metadata(doc_meta)
        
    return {"message": f"Successfully deleted document {filename}"}
