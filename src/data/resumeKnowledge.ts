export interface ResumeKnowledgeChunk {
  id: string;
  title: string;
  category: string;
  content: string;
}

export const RESUME_KNOWLEDGE_CHUNKS: ResumeKnowledgeChunk[] = [
  {
    id: 'profile',
    title: 'Profile & Contact Details',
    category: 'Contact & Summary',
    content: `Candidate Name: Sheetal Giridhar
Title: Data Analyst
Phone: +91 8310751419
Email: sheetalgiridhar1710@gmail.com
LinkedIn: https://www.linkedin.com/in/sheetal-giridhar/
Profile Summary: Experienced Data Analyst proficient in Advanced Excel, Power BI and SQL, with a strong business acumen. Skilled at transforming complex data into actionable insights and creating impactful visualizations to drive strategic decisions and operational efficiency.`
  },
  {
    id: 'skills_excel',
    title: 'Skills: Advanced Excel',
    category: 'Technical Skills',
    content: `Skill: Advanced Excel
Specific Capabilities: Pivot Tables, Macros, Power Query.`
  },
  {
    id: 'skills_powerbi',
    title: 'Skills: Power BI',
    category: 'Technical Skills',
    content: `Skill: Power BI
Specific Capabilities: DAX, Power Query, Dashboard Design, Statistical Analysis.`
  },
  {
    id: 'skills_sql',
    title: 'Skills: MS SQL',
    category: 'Technical Skills',
    content: `Skill: MS SQL
Specific Capabilities: Joins, Stored Procedures, Optimization, Data Extraction.`
  },
  {
    id: 'skills_python',
    title: 'Skills: Python',
    category: 'Technical Skills',
    content: `Skill: Python
Specific Capabilities: Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization.`
  },
  {
    id: 'skills_etl',
    title: 'Skills: ETL Skills',
    category: 'Technical Skills',
    content: `Skill: ETL Skills
Specific Capabilities: Data Cleaning, Data Modeling, ETL concepts.`
  },
  {
    id: 'exp_microline',
    title: 'Experience: Microline Information Systems',
    category: 'Experience',
    content: `Company: MICROLINE INFORMATION SYSTEMS
Role: Data Analyst
Tenure: Jun 2024 - Jul 2025
Key Achievements & Responsibilities:
• Led data analysis projects to track KPIs for supply chain and customer experience.
• Worked with large datasets using SQL, Python (Pandas, NumPy) for trend analysis.
• Integrated data from ERP/CRM systems into central BI dashboards.
• Improved reporting accuracy by 25% by implementing data validation frameworks.`
  },
  {
    id: 'exp_tsquare',
    title: 'Experience: TSQUARE HR CONSULTING Pvt Ltd',
    category: 'Experience',
    content: `Company: TSQUARE HR CONSULTING Pvt Ltd
Role: Data Analyst
Tenure: Apr 2021 - Jun 2023
Key Achievements & Responsibilities:
• Designed and developed interactive dashboards for sales and finance teams, reducing reporting cycle time by 55%.
• Conducted A/B testing analysis to measure campaign performance.
• Applied statistical methods (regression, correlation, hypothesis testing) to support business decisions.
• Created data pipelines using SQL & Python for automated reporting.
• Documented business requirements and delivered BI solutions for stakeholders.
• Built a sales forecast model that improved demand planning accuracy by 18%.`
  },
  {
    id: 'exp_infosys',
    title: 'Experience: Infosys',
    category: 'Experience',
    content: `Company: Infosys
Role: Junior Analyst
Tenure: Dec 2018 – Nov 2019
Key Achievements & Responsibilities:
• Gathered, cleaned and validated raw data from multiple sources.
• Built dashboards in Tableau / Power BI to visualize sales and operations data.
• Performed SQL queries for data extraction and ad-hoc reporting.
• Conducted EDA in Excel to highlight key business patterns.
• Identified customer churn drivers, supporting a strategy that boosted retention by 15%.`
  },
  {
    id: 'education',
    title: 'Education: MCA & BCA',
    category: 'Education',
    content: `Academic Degrees:
1. Nitte Meenakshi Institute of Technology: MCA (Master of Computer Application) – 2017.
2. MS Ramaiah College: BCA (Bachelor of Computer Application) – 2015.`
  },
  {
    id: 'certifications',
    title: 'Certifications',
    category: 'Certifications',
    content: `Verified Certifications:
1. Data Trained: PG Diploma in Data Science and Machine Learning – 2021.
2. Udemy: Data Analyst Associate (Power BI).
3. Coursera: SQL for Data Analytics.
4. Udemy: Python for Data Science.`
  },
  {
    id: 'proj_powerbi_hr',
    title: 'Project 1: Power BI based Human Resource Management',
    category: 'Projects',
    content: `Project 1: Power BI based Human Resource Management
Summary: Built a scalable Power BI-based ETL Pipeline to ingest and process data from SQL Server and delivering real-time insights on workforce.
Key Details:
• Preparing optimized Data Models and enhancing relationship between data tables.
• Worked on DAX measures to improving analytical depth and build scalable Dashboards.
• Automated data refreshes and transformations using Power Query and Power BI Gateway.
• Integrating multiple sources including SQL server, excel sheets and ensuring updates.
• Ensured data quality, lineage tracking, and scalable architecture for future growth.
Tech Stack: Power BI Desktop, Power BI Service, SSMS, Excel.`
  },
  {
    id: 'proj_azure_sales',
    title: 'Project 2: Azure and Power BI based Sales Optimization',
    category: 'Projects',
    content: `Project 2: Azure and Power BI based Sales Optimization
Summary: Developed an automated and scalable analytics pipeline using SQL Server, Python, Power BI, and Azure (ADF & Databricks) to deliver business-ready dashboards and insights.
Key Details:
• Loaded structured data into SQL Server using SSMS and optimized queries.
• Applied transformation and statistical logic in python for business insights.
• Developed curated datasets in power bi desktop for reporting and KPI tracking.
• Closely collaborated with BI teams to define KPIs and improve dashboard performance.
Tech Stack: Python (Matplotlib, Seaborn, Pandas), SQL, SSMS, Hypothesis Testing, SQL, Power BI desktop, Azure.`
  }
];

export const RESUME_FULL_TEXT = RESUME_KNOWLEDGE_CHUNKS.map(
  (c) => `=== ${c.title.toUpperCase()} ===\n${c.content}`
).join('\n\n');
