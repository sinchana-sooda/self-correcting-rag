from google import genai
from google.genai import types

import json
from app.config import settings


class LLMService:
    def __init__(self):
        # Primary model, plus fallbacks to try (in order) if the primary
        # 404s -- e.g. because your API key's tier/project doesn't have
        # access to it yet, or the model was retired. Adjust this list
        # once you confirm which models your key can actually see.
        self.model_candidates = [
    "gemini-3.5-flash",
]
        self.model_name = self.model_candidates[0]

        self.client = None
        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
            self._verify_model_access()
        else:
            print("[LLMService] No GEMINI_API_KEY set -> running in mock mode.")

    def _verify_model_access(self):
        """
        Runs once at startup. Confirms the API key can actually see the
        configured model, and if not, walks the fallback list and picks
        the first one that works. This turns a mystery 404 at chat-time
        into a clear log line at boot time.
        """
        try:
            available = {m.name.split("/")[-1] for m in self.client.models.list()}
        except Exception as e:
            print(f"[LLMService] Could not list models (key/auth problem?): {e}")
            return

        for candidate in self.model_candidates:
            if candidate in available:
                if candidate != self.model_name:
                    print(f"[LLMService] '{self.model_candidates[0]}' not available "
                          f"to this API key. Falling back to '{candidate}'.")
                self.model_name = candidate
                return

        print(f"[LLMService] WARNING: none of {self.model_candidates} are visible "
              f"to this API key. Available models include: "
              f"{sorted(available)[:10]}... Check that GEMINI_API_KEY is a "
              f"Gemini Developer API key (from aistudio.google.com/apikey), "
              f"not a Vertex AI / GCP key.")

    def _call_gemini(
        self,
        prompt: str,
        system_instruction: str = None,
        json_mode: bool = False,
    ) -> str:
        """
        Call Gemini using the latest google-genai SDK.
        """

        if not self.client:
            return self._get_mock_response(prompt, json_mode)

        try:
            config_kwargs = {}

            # Use the SDK's proper system_instruction field instead of
            # concatenating it into the prompt string -- concatenation
            # works but wastes the model's ability to weight system vs.
            # user content differently, and breaks citation/formatting
            # instructions on longer contexts.
            if system_instruction:
                config_kwargs["system_instruction"] = system_instruction

            if json_mode:
                config_kwargs["response_mime_type"] = "application/json"

            config = types.GenerateContentConfig(**config_kwargs)

            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )

            return response.text.strip()

        except Exception as e:
            err_str = str(e)
            print(f"[LLMService] Error calling Gemini (model={self.model_name}): {err_str}")

            # If it's a 404, it's almost always a bad/inaccessible model
            # name -- surface that explicitly instead of a generic message.
            if "404" in err_str or "NOT_FOUND" in err_str:
                print(f"[LLMService] Hint: run self.client.models.list() and confirm "
                      f"'{self.model_name}' appears there for this API key.")

            if json_mode:
                return json.dumps(
                    {
                        "is_sufficient": False,
                        "confidence_score": 0.0,
                        "missing_information": "Gemini API Error",
                        "reasoning": err_str,
                    }
                )

            return f"Error communicating with Gemini API: {err_str}"

    def evaluate_context(self, query: str, context: str) -> dict:
        """
        Critic Agent
        """

        system_instruction = (
        "You are a Critical Evaluation Agent. "
        "Determine whether the retrieved context is sufficient "
        "to answer the user's question. "
        "Return ONLY valid JSON."
        )

        prompt = f"""
    User Query:
    {query}

    Retrieved Context:
    {context}

    Evaluate whether the retrieved context is sufficient to answer the user's question.

    Rules:
    - If the context fully answers the user's question:
    - Set "is_sufficient" to true.
    - Set "confidence_score" between 0.80 and 1.00.
    - If the context is incomplete, unrelated, or missing important information:
    - Set "is_sufficient" to false.
    - Set "confidence_score" between 0.00 and 0.70.
    - Clearly explain what information is missing.
    - Return ONLY valid JSON.
    - Do not include any extra text or markdown.

    Return JSON in this format:

    {{
        "is_sufficient": true,
        "confidence_score": 0.95,
        "missing_information": "",
        "reasoning": ""
    }}
    """

        response_text = self._call_gemini(
            prompt,
            system_instruction,
            json_mode=True,
        )

        try:
            return json.loads(response_text)

        except Exception:
            return {
                "is_sufficient": False,
                "confidence_score": 0.0,
                "missing_information": "Failed to parse JSON",
                "reasoning": "Gemini returned invalid JSON",
            }

    def reformulate_query(self, query: str, missing_information: str) -> str:
        """
        Reformulator Agent: Analyzes the original query and missing info to generate a new search query.
        """
        system_instruction = (
            "You are an Advanced Query Reformulator. Your task is to analyze the original query and the "
            "missing information, and generate a single, highly optimized search query designed to retrieve "
            "the missing information from a vector database. Output ONLY the query string."
        )

        prompt = f"""
        Original Query: {query}
        Missing Information identified by Critic: {missing_information}

        Generate a single reformulated query that is clear, specific, and optimized for vector search. 
        Do not output any preamble, explanation, or markdown backticks, ONLY the reformulated query string.
        """

        return self._call_gemini(prompt, system_instruction, json_mode=False)

    def generate_final_answer(self, query: str, context: str) -> str:
        """
        Generator Agent: Generates a comprehensive answer supported by citations from the retrieved context.
        """
        system_instruction = (
            "You are a precise, evidence-based Question Answering System. Your task is to generate a comprehensive, "
            "accurate answer to the user's query based ONLY on the provided retrieved context. "
            "For every claim or fact you mention, you MUST include a precise inline citation referencing the source file name "
            "and page number from the context, in the format [Filename, Page X]."
        )

        prompt = f"""
        Context:
        {context}

        User Query: {query}

        Generate an answer supported by the context. Include citations like [filename.pdf, Page X] for every fact. 
        If the context does not contain enough information, explicitly state what is missing instead of guessing.
        """

        return self._call_gemini(prompt, system_instruction, json_mode=False)

    def generate_clarification(self, query: str, context: str, missing_information: str) -> str:
        """
        Clarification Agent: Asks clarification questions when retrieval fails after reformulating.
        """
        system_instruction = (
            "You are a helpful, customer-centric clarification assistant. Your goal is to inform the user what "
            "information we found and what was missing to confidently answer their query. Then, propose 2-3 specific "
            "clarification questions to help them get the correct answer."
        )

        prompt = f"""
        User Question: {query}
        
        Information We Found (if any):
        {context if context else "No relevant information found."}
        
        Missing Information:
        {missing_information}

        Acknowledge what is missing, summarize what little we know (citing where appropriate), and ask 2 or 3 specific questions for clarification.
        """

        return self._call_gemini(prompt, system_instruction, json_mode=False)

    def _get_mock_response(self, prompt: str, json_mode: bool) -> str:
        """
        Returns high-quality mockup responses if GEMINI_API_KEY is not set.
        This ensures the application is demo-ready and runs gracefully without configuration.
        """
        if json_mode:
            # We mock the Critic evaluation
            # If the query contains "specs" or "detailed", we make it insufficient to trigger the self-correcting flow!
            # Otherwise we make it sufficient to show a single-pass RAG.
            is_insufficient = any(x in prompt.lower() for x in ["specs", "detailed", "missing", "difference", "compare", "performance"])
            if is_insufficient:
                return json.dumps({
                    "is_sufficient": False,
                    "confidence_score": 0.45,
                    "missing_information": "Detailed specifications, performance metrics, and parameter comparisons.",
                    "reasoning": "The retrieved chunks mention the product name and overview, but lack the technical specs and benchmark data needed to answer."
                })
            else:
                return json.dumps({
                    "is_sufficient": True,
                    "confidence_score": 0.92,
                    "missing_information": "",
                    "reasoning": "The retrieved chunks contain direct answers regarding the startup guide and document details."
                })
        else:
            # Non-JSON responses
            if "Original Query" in prompt:
                # Reformulator
                return "detailed performance metrics specification comparison datasheet"
            elif "Citations" in prompt or "citations" in prompt.lower():
                # Final generator
                return (
                    "This is a demonstration response generated because your GEMINI_API_KEY environment variable is not configured. "
                    "In a live system, the RAG system extracts chunks from your uploaded documents and Gemini generates this answer. "
                    "Based on the sample context, the system operates correctly [sample_manual.pdf, Page 1] and uses local vector search indices [architecture.pdf, Page 3]."
                )
            else:
                # Clarification
                return (
                    "It looks like we are missing some context to fully answer your question. "
                    "We found documents referencing the system structure, but we lack specific information regarding your request.\n\n"
                    "Could you clarify:\n"
                    "1. Which version or product line are you referring to?\n"
                    "2. Are you looking for installation steps or troubleshooting guides?"
                )


llm_service = LLMService()