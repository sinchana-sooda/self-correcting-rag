import os
import sys

# Ensure backend directory is in python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.embedding_service import embedding_service
from app.services.vector_db import vector_db
from app.services.llm_service import llm_service
from app.services.rag_pipeline import rag_pipeline

def test_pipeline():
    print("--- 1. Testing Service Initializations ---")
    print(f"Embedding Model: {embedding_service.model_name}")
    print(f"ChromaDB Collection: {vector_db.collection.name}")
    print(f"LLM Model: {llm_service.model_name}")
    
    print("\n--- 2. Indexing Sample Testing Data ---")
    test_file = "test_manual.pdf"
    
    # Delete first to start clean
    vector_db.delete_document(test_file)
    
    test_chunks = [
        {
            "text": "The Alpha-X10 Core Engine operates at a peak temperature of 72 degrees Celsius. Going above 80 degrees Celsius triggers an automatic shutdown sequence.",
            "page": 1
        },
        {
            "text": "Alpha-X10 maintenance requires synthetic oil replacement every 15,000 operational hours. Do not use standard mineral lubricants as it causes engine degradation.",
            "page": 2
        }
    ]
    
    texts = [c["text"] for c in test_chunks]
    embeddings = embedding_service.get_embeddings_batch(texts)
    metadatas = [{"source": test_file, "page": c["page"], "chunk_idx": idx} for idx, c in enumerate(test_chunks)]
    ids = [f"{test_file}_c{idx}_p{c['page']}" for idx, c in enumerate(test_chunks)]
    
    vector_db.add_chunks(texts, embeddings, metadatas, ids)
    print(f"Successfully indexed {len(texts)} test chunks in ChromaDB.")
    
    print("\n--- 3. Running RAG Queries ---")
    
    # Query 1: Information is directly available
    query_1 = "What is the peak operating temperature of the Alpha-X10 engine?"
    print(f"Query 1: '{query_1}'")
    result_1 = rag_pipeline.query(query_1)
    
    print(f"Action Taken: {result_1['final_action']}")
    print(f"Response:\n{result_1['response']}")
    print(f"Retrieval Attempts: {len(result_1['retrieval_attempts'])}")
    print(f"Critic Sufficiency Score: {result_1['critic_evaluations'][0]['confidence_score']}")
    
    print("\n-------------------------------------------")
    
    # Query 2: Information is NOT available (triggers clarification questions)
    query_2 = "How do you install the wings of the Alpha-X10 aircraft?"
    print(f"Query 2: '{query_2}'")
    result_2 = rag_pipeline.query(query_2)
    
    print(f"Action Taken: {result_2['final_action']}")
    print(f"Response:\n{result_2['response']}")
    print(f"Critic Sufficiency Score: {result_2['critic_evaluations'][0]['confidence_score']}")
    
    # Clean up test database entries
    vector_db.delete_document(test_file)
    print("\nTest completed successfully!")

if __name__ == "__main__":
    test_pipeline()
