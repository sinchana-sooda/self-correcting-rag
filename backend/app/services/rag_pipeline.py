import time
import json
import os
from app.config import settings
from app.services.embedding_service import embedding_service
from app.services.vector_db import vector_db
from app.services.llm_service import llm_service

class RAGPipeline:
    def __init__(self):
        self.history_file = os.path.join(os.path.dirname(settings.UPLOAD_DIR), "query_history.json")
        # Ensure data folder exists
        os.makedirs(os.path.dirname(self.history_file), exist_ok=True)

    def query(self, user_query: str, k: int = 4) -> dict:
        """
        Orchestrate the Self-Correcting RAG pipeline:
        1. Retrieve chunks.
        2. Evaluate with Critic.
        3. If insufficient, reformulate query, retrieve more chunks, and merge.
        4. Re-evaluate.
        5. Generate final answer or clarification question.
        6. Log and save step-by-step trace.
        """
        start_time = time.time()
        print("\n" + "=" * 60)
        print("🔥🔥🔥 RAG PIPELINE IS RUNNING 🔥🔥🔥")
        print(f"📝 User Query: {user_query}")
        print("=" * 60)
        
        
        # Initialize trace log
        trace = {
            "query": user_query,
            "timestamp": time.time(),
            "model_used": llm_service.model_name,
            "embedding_model": embedding_service.model_name,
            "retrieval_attempts": [],
            "critic_evaluations": [],
            "reformulated_query": None,
            "final_action": "answer",  # "answer" or "clarification"
            "response": "",
            "latency_ms": 0,
            "tokens_used": 0 # Estimated/Mocked for Gemini API key calls
        }

        # --- ATTEMPT 1 ---
        # Generate query embedding
        print("\n🔍 ATTEMPT 1")
        print("Generating query embedding...")
        query_emb = embedding_service.get_embedding(user_query, is_query=True)
        
        # Retrieve chunks
        attempt1_chunks = vector_db.search(query_emb, n_results=k)
        print(f"✅ Retrieved {len(attempt1_chunks)} chunks")
        trace["retrieval_attempts"].append({
            "attempt": 1,
            "query_used": user_query,
            "chunks": attempt1_chunks
        })

        # Check if database is empty
        if not attempt1_chunks:
            # Fallback to direct prompt or clarification immediately
            trace["critic_evaluations"].append({
                "is_sufficient": False,
                "confidence_score": 0.0,
                "missing_information": "No documents uploaded or no matching records found.",
                "reasoning": "The vector database returned no matching chunks."
            })
            missing_info = "No documents have been indexed or matching information is not available."
            clarification = llm_service.generate_clarification(user_query, "", missing_info)
            
            trace["final_action"] = "clarification"
            trace["response"] = clarification
            trace["latency_ms"] = int((time.time() - start_time) * 1000)
            self._save_to_history(trace)
            return trace

        # Format context for Critic
        context_str_1 = self._format_context(attempt1_chunks)
        
        # Run Critic Evaluation
        critic_eval_1 = llm_service.evaluate_context(user_query, context_str_1)
        print("\n🤖 CRITIC EVALUATION #1")
        print(json.dumps(critic_eval_1, indent=2))
        trace["critic_evaluations"].append(critic_eval_1)

        # --- SELF-CORRECTION CHECK ---
        if critic_eval_1.get("is_sufficient", False):
            # Context is sufficient! Generate final answer
            answer = llm_service.generate_final_answer(user_query, context_str_1)
            trace["final_action"] = "answer"
            trace["response"] = answer
        else:
            # Context is insufficient! Trigger query reformulation
            print("\n❌ Context insufficient")
            print("🔄 Reformulating query...")
            missing_info = critic_eval_1.get("missing_information", "General details missing.")
            reformulated_query = llm_service.reformulate_query(user_query, missing_info)
            print(f"✨ Reformulated Query:\n{reformulated_query}")
            trace["reformulated_query"] = reformulated_query
            
            # --- ATTEMPT 2 ---
            # Embed reformulated query
            print("\n🔍 ATTEMPT 2")
            reform_emb = embedding_service.get_embedding(reformulated_query, is_query=True)
            attempt2_chunks = vector_db.search(reform_emb, n_results=k)
            print(f"✅ Retrieved {len(attempt2_chunks)} chunks")
            trace["retrieval_attempts"].append({
                "attempt": 2,
                "query_used": reformulated_query,
                "chunks": attempt2_chunks
            })

            # Merge chunks and remove duplicates
            combined_chunks = self._merge_chunks(attempt1_chunks, attempt2_chunks)
            context_str_2 = self._format_context(combined_chunks)

            # Re-evaluate combined context
            critic_eval_2 = llm_service.evaluate_context(user_query, context_str_2)
            print("\n🤖 CRITIC EVALUATION #2")
            print(json.dumps(critic_eval_2, indent=2))
            trace["critic_evaluations"].append(critic_eval_2)

            if critic_eval_2.get("is_sufficient", False):
                # Combined context sufficient! Generate answer
                answer = llm_service.generate_final_answer(user_query, context_str_2)
                trace["final_action"] = "answer"
                trace["response"] = answer
            else:
                # Still insufficient! Generate clarification questions to prevent hallucination
                clarification = llm_service.generate_clarification(user_query, context_str_2, critic_eval_2.get("missing_information", ""))
                trace["final_action"] = "clarification"
                trace["response"] = clarification

        # Calculate latency
        trace["latency_ms"] = int((time.time() - start_time) * 1000)
        
        # Approximate tokens
        trace["tokens_used"] = self._estimate_tokens(trace)
        
        # Save trace to persistent query log file
        self._save_to_history(trace)
        print("\n🏁 FINAL RESULT")
        print(f"Action: {trace['final_action']}")
        print(f"Latency: {trace['latency_ms']} ms")
        print(f"Estimated Tokens: {trace['tokens_used']}")
        print("=" * 60)
        return trace

    def _format_context(self, chunks: list[dict]) -> str:
        """
        Format retrieved chunks into a standard structured prompt context with metadata.
        """
        formatted = []
        for idx, chunk in enumerate(chunks):
            formatted.append(
                f"--- Chunk {idx+1} [Source: {chunk['source']}, Page: {chunk['page']}] ---\n"
                f"{chunk['text']}\n"
            )
        return "\n".join(formatted)

    def _merge_chunks(self, list1: list[dict], list2: list[dict]) -> list[dict]:
        """
        Merge two lists of chunks, removing duplicates based on chunk ID.
        """
        seen_ids = set()
        merged = []
        
        for chunk in list1 + list2:
            chunk_id = chunk.get("id")
            if chunk_id not in seen_ids:
                seen_ids.add(chunk_id)
                merged.append(chunk)
        return merged

    def _estimate_tokens(self, trace: dict) -> int:
        """
        Produce a reasonable estimation of token consumption for API feedback.
        """
        text_sum = len(trace["query"]) + len(trace["response"])
        for attempt in trace["retrieval_attempts"]:
            for chunk in attempt["chunks"]:
                text_sum += len(chunk["text"])
        # Standard approximation: 1 token ~ 4 characters
        return int(text_sum / 4) + 800

    def _save_to_history(self, trace: dict):
        """
        Persist query execution trace to query_history.json.
        """
        history = []
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r', encoding='utf-8') as f:
                    content = f.read().strip()
                    if content:
                        history = json.loads(content)
            except Exception as e:
                print(f"Error reading query history: {e}")
        
        # Add current trace at the beginning
        history.insert(0, trace)
        
        # Cap at 50 queries for sizing
        history = history[:50]
        
        try:
            with open(self.history_file, 'w', encoding='utf-8') as f:
                json.dump(history, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error writing query history: {e}")

    def get_history(self) -> list[dict]:
        """
        Load historical trace queries.
        """
        if not os.path.exists(self.history_file):
            return []
        try:
            with open(self.history_file, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if content:
                    return json.loads(content)
        except Exception as e:
            print(f"Error loading query history: {e}")
        return []

    def clear_history(self):
        """
        Clear search queries trace logs.
        """
        if os.path.exists(self.history_file):
            try:
                os.remove(self.history_file)
            except Exception as e:
                print(f"Error deleting history file: {e}")

rag_pipeline = RAGPipeline()
