import { RESUME_KNOWLEDGE_CHUNKS, ResumeKnowledgeChunk } from '../data/resumeKnowledge';

export interface RAGResult {
  answer: string;
  sources: string[];
  thinking?: string;
  model: string;
  sourceChunks: ResumeKnowledgeChunk[];
}

export type LLMProvider = 'azure' | 'nvidia' | 'grounded';

export interface LLMSettings {
  provider: LLMProvider;
  azureEndpoint: string;
  azureApiKey: string;
  azureDeployment: string;
  azureApiVersion: string;
  nvidiaApiKey: string;
}

const DEFAULT_SETTINGS: LLMSettings = {
  provider: 'grounded',
  azureEndpoint: '',
  azureApiKey: '',
  azureDeployment: 'gpt-4o',
  azureApiVersion: '2024-08-01-preview',
  nvidiaApiKey: '',
};

export function getStoredLLMSettings(): LLMSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem('sg_llm_settings');
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredLLMSettings(settings: Partial<LLMSettings>) {
  if (typeof window === 'undefined') return;
  const current = getStoredLLMSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem('sg_llm_settings', JSON.stringify(updated));
}

/**
 * Retrieves the most relevant chunks from Sheetal's resume based on high-precision keyword & entity scoring
 */
export function retrieveRelevantChunks(query: string, topK: number = 3): ResumeKnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase();
  const tokens = normalizedQuery
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const scoredChunks = RESUME_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    tokens.forEach((t) => {
      if (titleLower.includes(t)) score += 4;
      if (contentLower.includes(t)) score += 1.5;
    });

    if (normalizedQuery.includes('experience') || normalizedQuery.includes('company') || normalizedQuery.includes('work') || normalizedQuery.includes('job') || normalizedQuery.includes('microline') || normalizedQuery.includes('tsquare') || normalizedQuery.includes('infosys')) {
      if (chunk.category === 'Experience') score += 4;
    }
    if (normalizedQuery.includes('skill') || normalizedQuery.includes('tech') || normalizedQuery.includes('tool') || normalizedQuery.includes('python') || normalizedQuery.includes('sql') || normalizedQuery.includes('excel') || normalizedQuery.includes('power bi')) {
      if (chunk.category === 'Technical Skills') score += 4;
    }
    if (normalizedQuery.includes('project') || normalizedQuery.includes('pipeline') || normalizedQuery.includes('model') || normalizedQuery.includes('azure') || normalizedQuery.includes('hr') || normalizedQuery.includes('sales')) {
      if (chunk.category === 'Projects') score += 4;
    }
    if (normalizedQuery.includes('education') || normalizedQuery.includes('college') || normalizedQuery.includes('degree') || normalizedQuery.includes('mca') || normalizedQuery.includes('bca') || normalizedQuery.includes('nmit') || normalizedQuery.includes('ramaiah')) {
      if (chunk.category === 'Education') score += 5;
    }
    if (normalizedQuery.includes('certif') || normalizedQuery.includes('diploma') || normalizedQuery.includes('udemy') || normalizedQuery.includes('coursera')) {
      if (chunk.category === 'Certifications') score += 5;
    }
    if (normalizedQuery.includes('contact') || normalizedQuery.includes('phone') || normalizedQuery.includes('email') || normalizedQuery.includes('linkedin') || normalizedQuery.includes('number')) {
      if (chunk.category === 'Contact & Summary') score += 5;
    }
    if (normalizedQuery.includes('achievement') || normalizedQuery.includes('kpi') || normalizedQuery.includes('accuracy') || normalizedQuery.includes('forecast') || normalizedQuery.includes('reduction')) {
      if (chunk.category === 'Experience' || chunk.category === 'Projects') score += 4;
    }

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  const relevant = scoredChunks.filter((s) => s.score > 0).slice(0, topK);
  return relevant.length > 0 ? relevant.map((s) => s.chunk) : RESUME_KNOWLEDGE_CHUNKS.slice(0, 3);
}

/**
 * Universal query runner: supports Azure OpenAI API, NVIDIA Nemotron, and Zero-Config Grounded synthesis
 */
export async function queryResumeRAG(
  query: string,
  settings: LLMSettings,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<RAGResult> {
  const sourceChunks = retrieveRelevantChunks(query, 3);
  const sources = sourceChunks.map((c) => c.title);

  const contextText = sourceChunks
    .map((c) => `--- SECTION: ${c.title} (${c.category}) ---\n${c.content}`)
    .join('\n\n');

  const systemInstruction = `You are the official verified AI Resume Assistant for Sheetal Giridhar.
STRICT CONSTRAINT: You must answer questions using ONLY and EXCLUSIVELY the verified facts provided in the resume context below.
Do NOT invent, fabricate, extrapolate, or assume any information not explicitly stated in the context.
If a question asks about skills, experiences, degrees, or topics not mentioned in Sheetal's resume, clearly state:
"That information is not present in Sheetal Giridhar's verified resume."
Always be concise, professional, and reference verified resume facts.

VERIFIED RESUME CONTEXT:
${contextText}`;

  // 1. Azure OpenAI Flow
  if (settings.provider === 'azure' && settings.azureEndpoint && settings.azureApiKey) {
    try {
      const cleanEndpoint = settings.azureEndpoint.replace(/\/+$/, '');
      const deployment = settings.azureDeployment || 'gpt-4o';
      const apiVersion = settings.azureApiVersion || '2024-08-01-preview';
      const url = `${cleanEndpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

      const messages: { role: string; content: string }[] = [
        { role: 'system', content: systemInstruction },
        ...history.slice(-4).map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: query },
      ];

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': settings.azureApiKey.trim(),
        },
        body: JSON.stringify({
          messages,
          temperature: 0.2,
          max_tokens: 2048,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Azure API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const answer = data.choices[0]?.message?.content || 'No response generated.';

      return {
        answer,
        sources,
        model: `Azure OpenAI (${deployment})`,
        sourceChunks,
      };
    } catch (err: any) {
      console.warn('Azure OpenAI error, providing fallback:', err);
      return {
        answer: `[Azure OpenAI Error: ${err.message}].\n\nDirect verified details from Sheetal's resume:\n\n` +
          sourceChunks.map((c) => `**${c.title}**\n${c.content}`).join('\n\n'),
        sources,
        model: 'Azure API (Grounded Fallback)',
        sourceChunks,
      };
    }
  }

  // 2. NVIDIA Nemotron Flow
  if (settings.provider === 'nvidia' && settings.nvidiaApiKey) {
    try {
      const messages: { role: string; content: string }[] = [
        { role: 'system', content: systemInstruction },
        ...history.slice(-4).map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: query },
      ];

      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.nvidiaApiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
          messages,
          temperature: 0.2,
          top_p: 0.95,
          max_tokens: 2048,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`NVIDIA API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const choice = data.choices[0];
      const answer = choice.message?.content || 'No response generated.';
      const thinking = choice.message?.reasoning_content || undefined;

      return {
        answer,
        thinking,
        sources,
        model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
        sourceChunks,
      };
    } catch (err: any) {
      console.warn('NVIDIA API error, providing fallback:', err);
      return {
        answer: `[NVIDIA Nemotron Error: ${err.message}].\n\nDirect verified details from Sheetal's resume:\n\n` +
          sourceChunks.map((c) => `**${c.title}**\n${c.content}`).join('\n\n'),
        sources,
        model: 'Nemotron (Grounded Fallback)',
        sourceChunks,
      };
    }
  }

  // 3. High-Fidelity Zero-Config Grounded Mode
  const answer = synthesizeStrictResumeAnswer(query, sourceChunks);
  return {
    answer,
    sources,
    model: 'Grounded Resume Engine (Zero Hallucination)',
    sourceChunks,
  };
}

function synthesizeStrictResumeAnswer(query: string, chunks: ResumeKnowledgeChunk[]): string {
  const q = query.toLowerCase();

  if (q.includes('achievement') || q.includes('metric') || q.includes('impact') || q.includes('number') || q.includes('55%') || q.includes('25%') || q.includes('18%') || q.includes('15%')) {
    return `Here are Sheetal Giridhar's verified career achievements from her resume:
• **55% Reporting Cycle Time Reduction** at TSQUARE HR Consulting through automated interactive dashboards and SQL/Python pipelines.
• **+25% Data Reporting Accuracy Increase** at Microline Information Systems by architecting comprehensive data validation frameworks across ERP/CRM systems.
• **+18% Sales Forecast Accuracy** at TSQUARE HR Consulting by deploying regression, correlation, and statistical hypothesis testing.
• **+15% Customer Retention Rate Lift** at Infosys by analyzing customer churn drivers through EDA in Excel and SQL data extraction.
• **Enterprise Cloud Pipeline Architecture**: Azure Data Factory (ADF), Databricks, SQL Server, and Power BI real-time workforce & revenue tracking.
• **Postgraduate MCA (Master of Computer Application)**: 2017 graduation from Nitte Meenakshi Institute of Technology.`;
  }

  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('mca') || q.includes('bca')) {
    return `According to Sheetal Giridhar's resume:
• **MCA (Master of Computer Application)** – 2017 from Nitte Meenakshi Institute of Technology.
• **BCA (Bachelor of Computer Application)** – 2015 from MS Ramaiah College.`;
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('linkedin')) {
    return `Here are Sheetal Giridhar's verified contact details from her resume:
• **Phone:** +91 8310751419
• **Email:** sheetalgiridhar1710@gmail.com
• **LinkedIn:** https://www.linkedin.com/in/sheetal-giridhar/
• **Title:** Data Analyst`;
  }

  if (q.includes('project') || q.includes('pipeline') || q.includes('azure') || q.includes('hr') || q.includes('sales optimization')) {
    return `Sheetal's resume lists two verified core projects:
1. **Power BI based Human Resource Management**:
   Built a scalable Power BI-based ETL pipeline to ingest and process data from SQL Server, delivering real-time workforce insights.
   • Tech Stack: Power BI Desktop, Power BI Service, SSMS, Excel, Power Query, DAX.
   
2. **Azure and Power BI based Sales Optimization**:
   Developed an automated and scalable analytics pipeline using SQL Server, Python, Power BI, and Azure (ADF & Databricks) to deliver business-ready dashboards and insights.
   • Tech Stack: Python (Matplotlib, Seaborn, Pandas), SQL, SSMS, Hypothesis Testing, Power BI desktop, Azure.`;
  }

  if (q.includes('experience') || q.includes('company') || q.includes('work') || q.includes('microline') || q.includes('tsquare') || q.includes('infosys')) {
    return `Sheetal Giridhar has verified professional experience across three institutions:
1. **Microline Information Systems** (Jun 2024 - Jul 2025) – Data Analyst:
   • Led data analysis projects to track KPIs for supply chain and customer experience.
   • Worked with large datasets using SQL, Python (Pandas, NumPy).
   • Integrated data from ERP/CRM systems into central BI dashboards.
   • Improved reporting accuracy by 25% with validation frameworks.

2. **TSQUARE HR Consulting Pvt Ltd** (Apr 2021 - Jun 2023) – Data Analyst:
   • Designed interactive dashboards for sales/finance, cutting reporting cycle time by 55%.
   • Conducted A/B testing and statistical analysis (regression, correlation, hypothesis testing).
   • Built sales forecast model improving demand planning accuracy by 18%.

3. **Infosys** (Dec 2018 - Nov 2019) – Junior Analyst:
   • Built dashboards in Tableau / Power BI and performed SQL data extraction.
   • Identified customer churn drivers, boosting retention by 15%.`;
  }

  if (q.includes('certif') || q.includes('diploma') || q.includes('course')) {
    return `Sheetal's verified certifications include:
1. **PG Diploma in Data Science and Machine Learning (2021)** – Data Trained
2. **Data Analyst Associate (Power BI)** – Udemy
3. **SQL for Data Analytics** – Coursera
4. **Python for Data Science** – Udemy`;
  }

  if (q.includes('skill') || q.includes('tool') || q.includes('sql') || q.includes('python') || q.includes('excel') || q.includes('power bi')) {
    return `The core technical skills specified in Sheetal's resume are:
• **Advanced Excel**: Pivot Tables, Macros, Power Query
• **Power BI**: DAX, Power Query, Dashboard Design, Statistical Analysis
• **MS SQL**: Joins, Stored Procedures, Optimization, Data Extraction
• **Python**: Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization
• **ETL Skills**: Data Cleaning, Data Modeling, ETL concepts`;
  }

  return `Based strictly on Sheetal Giridhar's resume:\n\n` +
    chunks.map((c) => `**${c.title}**:\n${c.content}`).join('\n\n');
}
