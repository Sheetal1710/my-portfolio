export interface VercelLikeRequest {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
}

export interface VercelLikeResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: any) => void;
    end: () => void;
  };
}

const RESUME_CHUNKS = [
  {
    title: 'Profile & Contact',
    content:
      'Candidate: Sheetal Giridhar\nRole: Data Analyst\nPhone: +91 8310751419\nEmail: sheetalgiridhar1710@gmail.com\nLinkedIn: https://www.linkedin.com/in/sheetal-giridhar/\nSummary: Experienced Data Analyst proficient in Advanced Excel, Power BI and SQL, with a strong business acumen. Skilled at transforming complex data into actionable insights and creating impactful visualizations to drive strategic decisions and operational efficiency.'
  },
  {
    title: 'Achievements & Metrics',
    content:
      'Key Verified Achievements:\n• 55% reduction in reporting cycle time at TSQUARE HR Consulting via interactive Power BI & SQL dashboards.\n• +25% reporting accuracy increase at Microline Information Systems by implementing data validation frameworks across ERP/CRM systems.\n• +18% demand forecast accuracy at TSQUARE HR Consulting using regression, correlation, and hypothesis testing models.\n• +15% customer retention lift at Infosys through SQL churn analysis and EDA.\n• Postgraduate MCA (Master of Computer Application) – 2017, Nitte Meenakshi Institute of Technology.'
  },
  {
    title: 'Technical Skills',
    content:
      'Skills:\n• Advanced Excel: Pivot Tables, Macros, Power Query\n• Power BI: DAX, Power Query, Dashboard Design, Statistical Analysis\n• MS SQL: Joins, Stored Procedures, Optimization, Data Extraction\n• Python: Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization\n• ETL Skills: Data Cleaning, Data Modeling, ETL concepts'
  },
  {
    title: 'Experience - Microline Information Systems',
    content:
      'Microline Information Systems | Data Analyst (Jun 2024 - Jul 2025):\n• Led data analysis projects to track KPIs for supply chain and customer experience.\n• Worked with large datasets using SQL, Python (Pandas, NumPy) for trend analysis.\n• Integrated data from ERP/CRM systems into central BI dashboards.\n• Improved reporting accuracy by 25% by implementing data validation frameworks.'
  },
  {
    title: 'Experience - TSQUARE HR Consulting Pvt Ltd',
    content:
      'TSQUARE HR Consulting Pvt Ltd | Data Analyst (Apr 2021 - Jun 2023):\n• Designed and developed interactive dashboards for sales and finance teams, reducing reporting cycle time by 55%.\n• Conducted A/B testing analysis to measure campaign performance.\n• Applied statistical methods (regression, correlation, hypothesis testing) to support business decisions.\n• Created data pipelines using SQL & Python for automated reporting.\n• Documented business requirements and delivered BI solutions for stakeholders.\n• Built a sales forecast model that improved demand planning accuracy by 18%.'
  },
  {
    title: 'Experience - Infosys',
    content:
      'Infosys | Junior Analyst (Dec 2018 - Nov 2019):\n• Gathered, cleaned and validated raw data from multiple sources.\n• Built dashboards in Tableau / Power BI to visualize sales and operations data.\n• Performed SQL queries for data extraction and ad-hoc reporting.\n• Conducted EDA in Excel to highlight key business patterns.\n• Identified customer churn drivers, supporting a strategy that boosted retention by 15%.'
  },
  {
    title: 'Education & Certifications',
    content:
      'Education:\n• Nitte Meenakshi Institute of Technology: MCA (Master of Computer Application) – 2017\n• MS Ramaiah College: BCA (Bachelor of Computer Application) – 2015\n\nCertifications:\n• Data Trained: PG Diploma in Data Science and Machine Learning – 2021\n• Udemy: Data Analyst Associate (Power BI)\n• Coursera: SQL for Data Analytics\n• Udemy: Python for Data Science'
  },
  {
    title: 'Projects',
    content:
      'Project 1: Power BI based Human Resource Management\n• Summary: Built a scalable Power BI-based ETL Pipeline to ingest and process data from SQL Server and delivering real-time insights on workforce.\n• Tech Stack: Power BI Desktop, Power BI Service, SSMS, Excel.\n\nProject 2: Azure and Power BI based Sales Optimization\n• Summary: Developed an automated and scalable analytics pipeline using SQL Server, Python, Power BI, and Azure (ADF & Databricks) to deliver business-ready dashboards and insights.\n• Tech Stack: Python (Matplotlib, Seaborn, Pandas), SQL, SSMS, Hypothesis Testing, SQL, Power BI desktop, Azure.'
  }
];

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, query, provider = 'auto', azureConfig, apiKey, history = [] } = req.body || {};
  const userQuery = message || query;

  if (!userQuery) {
    return res.status(400).json({ error: "Missing 'message' in request body" });
  }

  const qLower = userQuery.toLowerCase();
  const matchedChunks = RESUME_CHUNKS.filter((c) => {
    const text = (c.title + ' ' + c.content).toLowerCase();
    const words = qLower.split(/\s+/).filter((w: string) => w.length > 2);
    return words.some((w: string) => text.includes(w));
  });

  const selectedChunks = matchedChunks.length > 0 ? matchedChunks.slice(0, 3) : RESUME_CHUNKS.slice(0, 3);
  const context = selectedChunks.map((c) => `### ${c.title}\n${c.content}`).join('\n\n');

  const systemPrompt = `You are the official verified AI Resume Assistant for Sheetal Giridhar.
CRITICAL CONSTRAINT: You must answer questions using ONLY and EXCLUSIVELY the verified facts provided in the resume context below.
Do NOT invent, fabricate, extrapolate, or assume any information not explicitly stated in the context.
If a question asks about skills, experiences, degrees, or topics not mentioned in Sheetal's resume, clearly state:
"That information is not present in Sheetal Giridhar's verified resume."

RESUME CONTEXT:
${context}`;

  // 1. Azure OpenAI Flow
  const azureEndpoint = azureConfig?.endpoint || process.env.AZURE_OPENAI_ENDPOINT;
  const azureApiKey = azureConfig?.apiKey || process.env.AZURE_OPENAI_API_KEY;
  const azureDeployment = azureConfig?.deployment || process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
  const azureApiVersion = azureConfig?.apiVersion || '2024-08-01-preview';

  if (provider === 'azure' || (azureEndpoint && azureApiKey)) {
    try {
      const cleanEndpoint = azureEndpoint.replace(/\/+$/, '');
      const url = `${cleanEndpoint}/openai/deployments/${azureDeployment}/chat/completions?api-version=${azureApiVersion}`;

      const azureRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': azureApiKey.trim(),
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...history.slice(-4),
            { role: 'user', content: userQuery },
          ],
          temperature: 0.2,
          max_tokens: 2048,
        }),
      });

      if (azureRes.ok) {
        const data = await azureRes.json();
        return res.status(200).json({
          answer: data.choices[0]?.message?.content || 'No response generated.',
          sources: selectedChunks.map((c) => c.title),
          model: `Azure OpenAI (${azureDeployment})`,
        });
      }
    } catch (err) {
      console.warn('Azure call error in serverless function:', err);
    }
  }

  // 2. NVIDIA Flow
  const nvidiaKey = apiKey || process.env.NVIDIA_API_KEY;
  if (provider === 'nvidia' && nvidiaKey) {
    try {
      const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${nvidiaKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
          messages: [
            { role: 'system', content: systemPrompt },
            ...history.slice(-4),
            { role: 'user', content: userQuery },
          ],
          temperature: 0.2,
          top_p: 0.95,
          max_tokens: 2048,
        }),
      });

      if (nvidiaRes.ok) {
        const data = await nvidiaRes.json();
        return res.status(200).json({
          answer: data.choices[0]?.message?.content || 'No answer generated.',
          sources: selectedChunks.map((c) => c.title),
          model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
        });
      }
    } catch (err) {
      console.warn('NVIDIA call error in serverless function:', err);
    }
  }

  // Fallback to grounded resume extraction
  return res.status(200).json({
    answer: `Verified details from Sheetal Giridhar's resume:\n\n` +
      selectedChunks.map((c) => `**${c.title}**\n${c.content}`).join('\n\n'),
    sources: selectedChunks.map((c) => c.title),
    model: 'Grounded Resume Engine (Ready for Azure / Vercel API)',
  });
}
