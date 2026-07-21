import os
from dotenv import load_dotenv

# Load local environment file if it exists
load_dotenv()

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Server configuration
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")
    
    # Folders for persistent data
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./data/uploads")
    CHROMA_DB_DIR: str = os.getenv("CHROMA_DB_DIR", "./data/chroma")

    def validate(self):
        if not self.GEMINI_API_KEY:
            print("WARNING: GEMINI_API_KEY is not set. The LLM services will fail until a key is provided.")
        
        # Ensure directories exist
        os.makedirs(self.UPLOAD_DIR, exist_ok=True)
        os.makedirs(self.CHROMA_DB_DIR, exist_ok=True)

settings = Settings()
settings.validate()
