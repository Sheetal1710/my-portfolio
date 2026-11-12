# Sheetal Giridhar Resume RAG Backend

This backend implements a Retrieval-Augmented Generation (RAG) system grounded **strictly in Sheetal Giridhar's verified resume**.

### Models Used
- **Generation LLM**: `nvidia/nemotron-3.5-lightning-30b-a3b`
  - Accessed via NVIDIA API Catalog (`https://integrate.api.nvidia.com/v1`)
  - Parameters: temperature 0.2-1.0, top_p 0.95, reasoning budget, strict system grounding.
- **Embeddings**: `nvidia/nemotron-3.5-embed-1b`
  - Input type: passage / query
  - Generates semantic embeddings for cosine similarity retrieval across resume chunks.

### Deploying to Vercel
1. In your Vercel Project Settings, set the Environment Variable:
   - `NVIDIA_API_KEY`: Your NVIDIA API key (from [NVIDIA NGC / Build](https://build.nvidia.com))
2. Vercel automatically detects `/api/chat.ts` (or Python serverless functions) with the root `vercel.json`.
3. Endpoints available:
   - `POST /api/chat`: Takes `{ "message": "...", "apiKey": "optional" }` and streams/returns the RAG grounded answer with sources.
   - `GET /api/chunks`: Returns all indexed resume knowledge chunks.

### Local Testing with Python
```bash
cd backend
pip install -r requirements.txt
export NVIDIA_API_KEY="your-key-here"
python app.py
```
