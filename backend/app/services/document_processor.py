import os
from pypdf import PdfReader

class DocumentProcessor:
    def __init__(self):
        pass

    def extract_and_chunk(self, file_path: str, filename: str) -> list[dict]:
        """
        Reads a PDF file, extracts text page-by-page, and splits into size-controlled chunks.
        Each chunk is represented as:
        {
            "text": str,
            "metadata": {
                "source": str,
                "page": int,
                "chunk_idx": int
            }
        }
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        reader = PdfReader(file_path)
        chunks = []
        
        for page_idx, page in enumerate(reader.pages):
            page_num = page_idx + 1
            text = page.extract_text()
            if not text:
                continue

            cleaned_text = self._clean_text(text)
            if not cleaned_text:
                continue

            # Split page text into chunks of approx 300 words with 50 words overlap
            page_chunks = self._chunk_page_text(cleaned_text, word_limit=300, overlap=50)
            
            for chunk_idx, chunk_text in enumerate(page_chunks):
                chunks.append({
                    "text": chunk_text,
                    "metadata": {
                        "source": filename,
                        "page": page_num,
                        "chunk_idx": chunk_idx
                    }
                })

        return chunks

    def _clean_text(self, text: str) -> str:
        """
        Clean up common PDF text issues like double spaces, trailing spaces, empty lines.
        """
        lines = [line.strip() for line in text.splitlines()]
        cleaned_lines = [line for line in lines if line]
        return "\n".join(cleaned_lines).strip()

    def _chunk_page_text(self, text: str, word_limit: int = 300, overlap: int = 50) -> list[str]:
        """
        Chunks the page text into overlapping windows based on words.
        """
        words = text.split()
        if len(words) <= word_limit:
            return [text]

        chunks = []
        i = 0
        while i < len(words):
            # Take the window of words
            window = words[i : i + word_limit]
            chunk_text = " ".join(window)
            chunks.append(chunk_text)
            
            # Slide the window forward
            i += (word_limit - overlap)
            
            # If the remaining words are fewer than the overlap, we stop (avoid tiny final chunks)
            if len(words) - i <= overlap and len(words) - i > 0:
                final_window = words[i:]
                if final_window:
                    chunks.append(" ".join(final_window))
                break

        return chunks

document_processor = DocumentProcessor()
