
interface VercelLikeRequest {
  method?: string;
  body?: {
    message?: string;
    query?: string;
    history?: { role: "user" | "assistant"; content: string }[];
  };
}

interface VercelLikeResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => void;
    end: () => void;
  };
}

const RESUME_CONTEXT = `
Candidate: Sheetal Giridhar
Role: Data Analyst

Summary:
Experienced Data Analyst proficient in Advanced Excel, Power BI, SQL,
and Python. Skilled at transforming complex data into actionable insights.

Technical Skills:
- Advanced Excel: Pivot Tables, Macros, Power Query
- Power BI: DAX, Power Query, Dashboard Design, Statistical Analysis
- MS SQL: Joins, Stored Procedures, Optimization, Data Extraction
- Python: Pandas, NumPy, Matplotlib, Seaborn
- ETL: Data Cleaning, Data Modeling, ETL concepts

Experience:

1. Sigma Software Solutions Pvt Ltd | Data Analyst
June 2024 - July 2025
- Analyzed supply chain and customer experience KPIs.
- Used SQL and Python for trend analysis.
- Integrated ERP/CRM data into BI dashboards.
- Improved reporting accuracy by 25% through data validation frameworks.

2. TSquare HR Consulting Pvt Ltd | Data Analyst
April 2021 - June 2023
- Developed sales and finance dashboards, reducing reporting cycle time by 55%.
- Conducted A/B testing.
- Applied regression, correlation and hypothesis testing.
- Automated reporting using SQL and Python.
- Improved demand planning accuracy by 18% through sales forecasting.

3. Infosys | Junior Analyst
December 2018 - November 2019
- Gathered, cleaned and validated data.
- Built Tableau and Power BI dashboards.
- Performed SQL data extraction and reporting.
- Identified churn drivers, supporting a strategy that improved retention by 15%.

Projects:

1. Power BI-based Human Resource Management
- Built ETL pipelines using SQL Server.
- Developed data models, DAX measures and dashboards.
- Worked with Power BI Service, Excel and SSMS.

2. Azure and Power BI-based Sales Optimization
- Built an analytics pipeline using SQL Server, Python, Power BI and Azure ADF/Databricks.
- Used Python for data transformations and statistical analysis.

Education:
- MCA, Nitte Meenakshi Institute of Technology, 2017
- BCA, MS Ramaiah College, 2015

Certifications:
- PG Diploma in Data Science and Machine Learning, Data Trained
- Data Analyst Associate (Power BI), Udemy
- SQL for Data Analytics, Coursera
- Python for Data Science, Udemy

Contact:
Email: sheetalgiridhar1710@gmail.com
LinkedIn: https://www.linkedin.com/in/sheetal-giridhar/
`;

export default async function handler(
  req: VercelLikeRequest,
  res: VercelLikeResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const message = req.body?.message || req.body?.query;
  const history = req.body?.history || [];

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      error: "Please provide a valid message."
    });
  }

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-08-01-preview";

  if (!endpoint || !apiKey || !deployment) {
    return res.status(500).json({
      error: "Azure OpenAI environment variables are not configured."
    });
  }

  try {
    const cleanEndpoint = endpoint.replace(/\/+$/, "");

    const url =
      `${cleanEndpoint}/openai/deployments/${deployment}` +
      `/chat/completions?api-version=${apiVersion}`;

    const azureResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are the AI Resume Assistant for Sheetal Giridhar.

Answer questions using only the verified resume information below.
Do not invent qualifications, skills, experience, achievements or personal details.
If information is unavailable, say:
"That information is not present in Sheetal Giridhar's resume."

Keep answers friendly, professional and concise.

RESUME INFORMATION:
${RESUME_CONTEXT}`
          },
          ...history
            .filter(
              (item) =>
                (item.role === "user" || item.role === "assistant") &&
                typeof item.content === "string"
            )
            .slice(-6),
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.2,
        max_tokens: 1000
      })
    });

    if (!azureResponse.ok) {
      const errorDetails = await azureResponse.text();
      console.error("Azure OpenAI error:", errorDetails);

      return res.status(502).json({
        error: "Azure OpenAI could not generate a response. Please try again."
      });
    }

    const data = await azureResponse.json();

    return res.status(200).json({
      answer:
        data.choices?.[0]?.message?.content ||
        "Sorry, I could not generate an answer.",
      model: deployment
    });

  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "Something went wrong while processing your message."
    });
  }
}
