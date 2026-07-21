import chromadb
from app.config import settings

class VectorDBService:
    def __init__(self):
        # Initialize persistent ChromaDB client
        self.client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)
        
        # Get or create collection with cosine similarity configuration
        self.collection = self.client.get_or_create_collection(
            name="rag_documents",
            metadata={"hnsw:space": "cosine"}
        )

    def add_chunks(self, texts: list[str], embeddings: list[list[float]], metadatas: list[dict], ids: list[str]):
        """
        Add text chunks, their embeddings, metadata, and IDs to the vector collection.
        """
        if not texts:
            return
        
        self.collection.add(
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids
        )

    def search(self, query_embedding: list[float], n_results: int = 5) -> list[dict]:
        """
        Search for top matching text chunks based on query embedding.
        Returns a list of dicts: {"text": str, "source": str, "page": int, "score": float}
        """
        try:
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results
            )
            
            formatted_results = []
            if not results or not results["documents"] or len(results["documents"][0]) == 0:
                return formatted_results

            documents = results["documents"][0]
            metadatas = results["metadatas"][0]
            distances = results["distances"][0] if "distances" in results and results["distances"] else [0.5] * len(documents)
            ids = results["ids"][0]

            for doc, meta, dist, chunk_id in zip(documents, metadatas, distances, ids):
                # Cosine distance to similarity: similarity = 1 - distance
                similarity = round(1.0 - dist, 4)
                
                formatted_results.append({
                    "id": chunk_id,
                    "text": doc,
                    "source": meta.get("source", "Unknown"),
                    "page": meta.get("page", 0),
                    "score": similarity
                })
            
            return formatted_results
        except Exception as e:
            print(f"Error querying ChromaDB: {e}")
            return []

    def get_all_documents(self) -> list[str]:
        """
        Returns a list of unique document filenames currently stored in ChromaDB.
        """
        try:
            # Fetch all metadata from collection
            results = self.collection.get(include=["metadatas"])
            if not results or not results["metadatas"]:
                return []
            
            unique_sources = set()
            for meta in results["metadatas"]:
                if meta and "source" in meta:
                    unique_sources.add(meta["source"])
            
            return sorted(list(unique_sources))
        except Exception as e:
            print(f"Error listing documents from ChromaDB: {e}")
            return []

    def delete_document(self, filename: str):
        """
        Deletes all chunks associated with a specific document filename.
        """
        try:
            self.collection.delete(where={"source": filename})
            print(f"Successfully deleted all chunks for {filename} from ChromaDB.")
        except Exception as e:
            print(f"Error deleting document {filename} from ChromaDB: {e}")

    def get_stats(self) -> dict:
        """
        Get vector store statistics (total chunks, list of files, etc.).
        """
        try:
            count = self.collection.count()
            docs = self.get_all_documents()
            return {
                "total_chunks": count,
                "total_documents": len(docs),
                "documents": docs
            }
        except Exception as e:
            print(f"Error getting ChromaDB stats: {e}")
            return {
                "total_chunks": 0,
                "total_documents": 0,
                "documents": []
            }

vector_db = VectorDBService()
