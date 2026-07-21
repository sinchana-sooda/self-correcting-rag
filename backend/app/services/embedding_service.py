from google import genai
from app.config import settings


class EmbeddingService:
    def __init__(self):
        self.client = None

        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

        self.model_name = "gemini-embedding-001"

    def get_embedding(self, text: str, is_query: bool = False) -> list[float]:
        """
        Generate embedding for a single text.
        """

        if not self.client:
            return [0.0] * 768

        try:
            response = self.client.models.embed_content(
                model=self.model_name,
                contents=text,
            )

            return response.embeddings[0].values

        except Exception as e:
            print(f"Embedding error: {e}")
            return [0.0] * 768

    def get_embeddings_batch(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings for multiple texts.
        """

        if not self.client:
            return [[0.0] * 768 for _ in texts]

        vectors = []

        try:
            for text in texts:
                response = self.client.models.embed_content(
                    model=self.model_name,
                    contents=text,
                )

                vectors.append(response.embeddings[0].values)

            return vectors

        except Exception as e:
            print(f"Batch embedding error: {e}")

            return [self.get_embedding(text) for text in texts]


embedding_service = EmbeddingService()