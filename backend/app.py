"""
Flask application for NVIDIA Nemotron RAG on Sheetal Giridhar's Resume.
Compliant with Vercel serverless Python deployment (exports `app`).
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from nemotron_rag import generate_rag_response, retrieve_relevant_chunks, RESUME_CHUNKS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Sheetal Giridhar Resume RAG API",
        "llm_model": "nvidia/nemotron-3.5-lightning-30b-a3b",
        "embed_model": "nvidia/nemotron-3.5-embed-1b",
        "total_knowledge_chunks": len(RESUME_CHUNKS)
    })

@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json(force=True, silent=True) or {}
    query = body.get("message") or body.get("query")
    if not query:
        return jsonify({"error": "Missing 'message' in request body"}), 400

    api_key = body.get("apiKey") or os.environ.get("NVIDIA_API_KEY")
    history = body.get("history", [])

    if not api_key:
        # Fallback to local deterministic retrieval if no NVIDIA key is provided yet
        chunks = retrieve_relevant_chunks(query, top_k=3)
        return jsonify({
            "answer": "Notice: NVIDIA_API_KEY is not configured yet. Here are the exact matching sections from Sheetal's resume:\n\n" + 
                      "\n\n".join([f"**{c['title']}**\n{c['content']}" for c in chunks]),
            "sources": [c["title"] for c in chunks],
            "requiresApiKey": True,
            "model": "nvidia/nemotron-3.5-lightning-30b-a3b (pending key)"
        })

    result = generate_rag_response(query, api_key=api_key, history=history)
    return jsonify(result)

@app.route("/api/chunks", methods=["GET"])
def get_chunks():
    return jsonify({
        "chunks": RESUME_CHUNKS,
        "count": len(RESUME_CHUNKS)
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
