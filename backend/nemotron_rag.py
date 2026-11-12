"""
NVIDIA Nemotron RAG & Knowledge Engine for Sheetal Giridhar Resume.
Provides:
1. Exact knowledge chunks extracted strictly from the provided 2-page resume doc.
2. Embedding vector computation via NVIDIA 'nvidia/nemotron-3.5-embed-1b' (OpenAI SDK compatible).
3. Cosine similarity retrieval over the resume chunks.
4. Answer generation with strict context grounding using NVIDIA 'nvidia/nemotron-3.5-lightning-30b-a3b' (via ChatNVIDIA or OpenAI SDK).
"""

import os
import math
import json
from typing import List, Dict, Any, Optional

# NVIDIA API Configuration
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"
NVIDIA_LLM_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b"
NVIDIA_EMBED_MODEL = "nvidia/nemotron-3.5-embed-1b"

# Verifiable resume knowledge chunks - strictly and exclusively from Sheetal Giridhar's resume document
RESUME_CHUNKS = [
    {
        "id": "profile",
        "title": "Profile & Contact",
        "content": (
            "Candidate: Sheetal Giridhar\n"
            "Role: Data Analyst\n"
            "Contact Phone: +91 8310751419\n"
            "Contact Email: sheetalgiridhar1710@gmail.com\n"
            "LinkedIn: https://www.linkedin.com/in/sheetal-giridhar/\n"
            "Professional Summary: Experienced Data Analyst proficient in Advanced Excel, Power BI and SQL, "
            "with a strong business acumen. Skilled at transforming complex data into actionable insights "
            "and creating impactful visualizations to drive strategic decisions and operational efficiency."
        )
    },
    {
        "id": "skills",
        "title": "Technical Skills",
        "content": (
            "Skills & Tooling from Resume:\n"
            "1. Advanced Excel: Pivot Tables, Macros, Power Query.\n"
            "2. Power BI: DAX, Power Query, Dashboard Design, Statistical Analysis.\n"
            "3. MS SQL: Joins, Stored Procedures, Optimization, Data Extraction.\n"
            "4. Python: Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization.\n"
            "5. ETL Skills: Data Cleaning, Data Modeling, ETL concepts."
        )
    },
    {
        "id": "experience_microline",
        "title": "Experience - Microline Information Systems",
        "content": (
            "Company: Microline Information Systems\n"
            "Role: Data Analyst\n"
            "Duration: Jun 2024 - Jul 2025\n"
            "Responsibilities & Achievements:\n"
            "• Led data analysis projects to track KPIs for supply chain and customer experience.\n"
            "• Worked with large datasets using SQL, Python (Pandas, NumPy) for trend analysis.\n"
            "• Integrated data from ERP/CRM systems into central BI dashboards.\n"
            "• Improved reporting accuracy by 25% by implementing data validation frameworks."
        )
    },
    {
        "id": "experience_tsquare",
        "title": "Experience - TSQUARE HR Consulting Pvt Ltd",
        "content": (
            "Company: TSQUARE HR Consulting Pvt Ltd\n"
            "Role: Data Analyst\n"
            "Duration: Apr 2021 - Jun 2023\n"
            "Responsibilities & Achievements:\n"
            "• Designed and developed interactive dashboards for sales and finance teams, reducing reporting cycle time by 55%.\n"
            "• Conducted A/B testing analysis to measure campaign performance.\n"
            "• Applied statistical methods (regression, correlation, hypothesis testing) to support business decisions.\n"
            "• Created data pipelines using SQL & Python for automated reporting.\n"
            "• Documented business requirements and delivered BI solutions for stakeholders.\n"
            "• Built a sales forecast model that improved demand planning accuracy by 18%."
        )
    },
    {
        "id": "experience_infosys",
        "title": "Experience - Infosys",
        "content": (
            "Company: Infosys\n"
            "Role: Junior Analyst\n"
            "Duration: Dec 2018 – Nov 2019\n"
            "Responsibilities & Achievements:\n"
            "• Gathered, cleaned and validated raw data from multiple sources.\n"
            "• Built dashboards in Tableau / Power BI to visualize sales and operations data.\n"
            "• Performed SQL queries for data extraction and ad-hoc reporting.\n"
            "• Conducted EDA in Excel to highlight key business patterns.\n"
            "• Identified customer churn drivers, supporting a strategy that boosted retention by 15%."
        )
    },
    {
        "id": "education",
        "title": "Education",
        "content": (
            "Education Qualifications:\n"
            "• Master of Computer Application (MCA) – 2017 from Nitte Meenakshi Institute of Technology.\n"
            "• Bachelor of Computer Application (BCA) – 2015 from MS Ramaiah College."
        )
    },
    {
        "id": "certifications",
        "title": "Certifications",
        "content": (
            "Certifications:\n"
            "1. Data Trained: PG Diploma in Data Science and Machine Learning – 2021.\n"
            "2. Udemy: Data Analyst Associate (Power BI).\n"
            "3. Coursera: SQL for Data Analytics.\n"
            "4. Udemy: Python for Data Science."
        )
    },
    {
        "id": "project_1",
        "title": "Project 1 - Power BI based Human Resource Management",
        "content": (
            "Project 1: Power BI based Human Resource Management\n"
            "Summary: Built a scalable Power BI-based ETL Pipeline to ingest and process data from SQL Server and delivering real-time insights on workforce.\n"
            "Highlights:\n"
            "• Preparing optimized Data Models and enhancing relationship between data tables.\n"
            "• Worked on DAX measures to improving analytical depth and build scalable Dashboards.\n"
            "• Automated data refreshes and transformations using Power Query and Power BI Gateway.\n"
            "• Integrating multiple sources including SQL server, excel sheets and ensuring updates.\n"
            "• Ensured data quality, lineage tracking, and scalable architecture for future growth.\n"
            "Tech Stack: Power BI Desktop, Power BI Service, SSMS, Excel."
        )
    },
    {
        "id": "project_2",
        "title": "Project 2 - Azure and Power BI based Sales Optimization",
        "content": (
            "Project 2: Azure and Power BI based Sales Optimization\n"
            "Summary: Developed an automated and scalable analytics pipeline using SQL Server, Python, Power BI, and Azure (ADF & Databricks) to deliver business-ready dashboards and insights.\n"
            "Highlights:\n"
            "• Loaded structured data into SQL Server using SSMS and optimized queries.\n"
            "• Applied transformation and statistical logic in python for business insights.\n"
            "• Developed curated datasets in power bi desktop for reporting and KPI tracking.\n"
            "• Closely collaborated with BI teams to define KPIs and improve dashboard performance.\n"
            "Tech Stack: Python (Matplotlib, Seaborn, Pandas), SQL, SSMS, Hypothesis Testing, SQL, Power BI desktop, Azure."
        )
    }
]

SYSTEM_PROMPT = """You are the official verified AI Resume Assistant for Sheetal Giridhar.
CRITICAL CONSTRAINT: You must answer questions using ONLY and EXCLUSIVELY the verified facts provided in the resume context below.
Do NOT invent, fabricate, extrapolate, or assume any information not explicitly stated in the context.
If a question asks about skills, experiences, degrees, or topics not mentioned in Sheetal's resume, clearly state:
"That information is not present in Sheetal Giridhar's verified resume."
Always maintain a courteous, professional, and precise tone."""


def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot_product / (norm_a * norm_b)


def get_embedding(text: str, api_key: str) -> Optional[List[float]]:
    try:
        from openai import OpenAI
        client = OpenAI(
            api_key=api_key,
            base_url=NVIDIA_BASE_URL
        )
        response = client.embeddings.create(
            input=[text],
            model=NVIDIA_EMBED_MODEL,
            encoding_format="float",
            extra_body={"input_type": "query", "truncate": "END"}
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"[Warning] NVIDIA Embedding call error: {e}")
        return None


def retrieve_relevant_chunks(query: str, api_key: Optional[str] = None, top_k: int = 3) -> List[Dict[str, Any]]:
    # If API key is provided and embedding succeeds, use semantic cosine similarity
    if api_key:
        query_vec = get_embedding(query, api_key)
        if query_vec:
            scored_chunks = []
            for chunk in RESUME_CHUNKS:
                chunk_vec = get_embedding(chunk["content"], api_key)
                if chunk_vec:
                    score = cosine_similarity(query_vec, chunk_vec)
                    scored_chunks.append({**chunk, "score": score})
            if scored_chunks:
                scored_chunks.sort(key=lambda x: x["score"], reverse=True)
                return scored_chunks[:top_k]

    # Deterministic high-precision fallback keyword & term scoring
    query_lower = query.lower()
    terms = [t for t in query_lower.replace("?", "").replace(",", "").split() if len(t) > 2]
    
    scored = []
    for chunk in RESUME_CHUNKS:
        content_lower = chunk["content"].lower()
        title_lower = chunk["title"].lower()
        score = 0.0
        for term in terms:
            if term in title_lower:
                score += 3.0
            if term in content_lower:
                score += 1.0
        scored.append({**chunk, "score": score})
    
    scored.sort(key=lambda x: x["score"], reverse=True)
    # Always include at least the top matching chunks
    top_matches = [c for c in scored if c["score"] > 0]
    return top_matches[:top_k] if top_matches else RESUME_CHUNKS[:3]


def generate_rag_response(query: str, api_key: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
    relevant_chunks = retrieve_relevant_chunks(query, api_key=api_key, top_k=3)
    context_text = "\n\n---\n\n".join([f"[{c['title']}]\n{c['content']}" for c in relevant_chunks])

    messages = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nRESUME CONTEXT:\n{context_text}"}
    ]
    if history:
        for msg in history[-4:]:
            messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
    messages.append({"role": "user", "content": query})

    try:
        from openai import OpenAI
        client = OpenAI(
            api_key=api_key,
            base_url=NVIDIA_BASE_URL
        )
        response = client.chat.completions.create(
            model=NVIDIA_LLM_MODEL,
            messages=messages,
            temperature=0.2,  # Low temperature for strict factual accuracy on resume data
            top_p=0.95,
            max_tokens=2048,
        )
        content = response.choices[0].message.content
        return {
            "answer": content,
            "sources": [c["title"] for c in relevant_chunks],
            "model": NVIDIA_LLM_MODEL,
            "embed_model": NVIDIA_EMBED_MODEL
        }
    except Exception as e:
        return {
            "error": str(e),
            "fallback_answer": f"Unable to reach NVIDIA Nemotron API ({e}). Showing top resume matches directly.",
            "sources": [c["title"] for c in relevant_chunks],
            "context": context_text
        }
