import {
  ResumeProfile,
  WorkExperience,
  ProjectItem,
  Certification,
  EducationItem,
  SkillCategory,
} from '../types';

export const resumeProfile: ResumeProfile = {
  name: 'Sheetal Giridhar',
  title: 'Data Analyst & Software / GenAI Engineer',
  tagline: 'Transforming complex data into actionable insights, scalable pipelines, and high-impact analytics solutions',
  phone: '+91 8310751419',
  email: 'sheetalgiridhar1710@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sheetal-giridhar/',
  github: 'https://github.com/sheetal-giridhar',
  portfolio: 'https://sheetal-giridhar.dev',
  location: 'Bengaluru, India',
  profileSummary:
    'Experienced Data Analyst proficient in Advanced Excel, Power BI and SQL, with a strong business acumen. Skilled at transforming complex data into actionable insights and creating impactful visualizations to drive strategic decisions and operational efficiency.',
  aspirations:
    'Actively pursuing high-impact opportunities in Generative AI, AI Agents, Forward Deployed Engineering (FDE), and AI-driven software development.',
};

export const skillsData: SkillCategory[] = [
  {
    title: 'Advanced Excel',
    description: 'Pivot Tables, Macros, Power Query for rapid exploratory modeling and operational reporting',
    skills: ['Pivot Tables', 'VBA & Macros', 'Power Query', 'Data Cleaning', 'Formula Modeling'],
    iconName: 'FileSpreadsheet',
  },
  {
    title: 'Power BI',
    description: 'DAX, Power Query, Dashboard Design, Statistical Analysis, and Enterprise Gateways',
    skills: ['DAX Measures', 'Power Query M', 'Dashboard Design', 'Data Modeling', 'Power BI Service & Gateway'],
    iconName: 'BarChart3',
  },
  {
    title: 'MS SQL Server',
    description: 'Joins, Stored Procedures, Optimization, Complex Queries, and Data Extraction',
    skills: ['Complex Joins', 'Stored Procedures', 'Query Optimization', 'Data Extraction', 'SSMS'],
    iconName: 'Database',
  },
  {
    title: 'Python for Data Science',
    description: 'Pandas, NumPy, Matplotlib, Seaborn for data manipulation, statistical logic & visualization',
    skills: ['Python 3', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Hypothesis Testing'],
    iconName: 'Code2',
  },
  {
    title: 'ETL & Data Engineering',
    description: 'Data Cleaning, Star/Snowflake Schema Data Modeling, and automated ingestion pipelines',
    skills: ['Data Cleaning', 'Data Modeling', 'ETL Pipelines', 'Lineage Tracking', 'Data Validation'],
    iconName: 'Workflow',
  },
  {
    title: 'Cloud & Modern Analytics',
    description: 'Azure Data Factory (ADF), Databricks, and SQL integrations for scalable cloud analytics',
    skills: ['Azure (ADF)', 'Databricks', 'Cloud SQL', 'Automated Refreshes', 'CRM/ERP Ingestion'],
    iconName: 'Cloud',
  },
];

export const experienceData: WorkExperience[] = [
  {
    id: 'exp-1',
    company: 'Microline Information Systems',
    role: 'Data Analyst',
    period: 'Jun 2024 – Jul 2025',
    tags: ['SQL', 'Python', 'Power BI', 'ERP/CRM', 'Data Validation'],
    metrics: [
      { label: 'Reporting Accuracy', value: '+25%' },
      { label: 'Scope', value: 'Supply Chain & CX' },
    ],
    points: [
      'Led data analysis projects to track Key Performance Indicators (KPIs) for supply chain and customer experience.',
      'Worked with large datasets using SQL, Python (Pandas, NumPy) for advanced trend analysis and anomaly detection.',
      'Integrated data from disparate ERP/CRM systems into central Power BI dashboards for executive decision-making.',
      'Improved reporting accuracy by 25% by implementing robust data validation frameworks and automated audits.',
    ],
  },
  {
    id: 'exp-2',
    company: 'TSQUARE HR Consulting Pvt Ltd',
    role: 'Data Analyst',
    period: 'Apr 2021 – Jun 2023',
    tags: ['Power BI', 'Python', 'SQL', 'A/B Testing', 'Forecasting'],
    metrics: [
      { label: 'Cycle Time Reduction', value: '55%' },
      { label: 'Demand Forecast Accuracy', value: '+18%' },
    ],
    points: [
      'Designed and developed interactive dashboards for sales and finance teams, reducing reporting cycle time by 55%.',
      'Conducted rigorous A/B testing analysis to measure campaign performance and conversion velocity.',
      'Applied statistical methods (regression, correlation, hypothesis testing) to support strategic business decisions.',
      'Created automated data pipelines using SQL & Python for scheduled periodic reporting without manual overhead.',
      'Documented end-to-end business requirements and delivered robust BI solutions directly to stakeholders.',
      'Built a sales forecast model that improved demand planning accuracy by 18%.',
    ],
  },
  {
    id: 'exp-3',
    company: 'Infosys',
    role: 'Junior Analyst',
    period: 'Dec 2018 – Nov 2019',
    tags: ['SQL', 'Tableau', 'Power BI', 'EDA', 'Excel'],
    metrics: [
      { label: 'Customer Retention', value: '+15%' },
      { label: 'Analytics Scope', value: 'Sales & Ops' },
    ],
    points: [
      'Gathered, cleaned, and validated raw multi-source enterprise data to establish single sources of truth.',
      'Built interactive dashboards in Tableau and Power BI to visualize high-volume sales and operations data.',
      'Performed complex SQL queries for targeted data extraction and rapid ad-hoc reporting requests.',
      'Conducted Exploratory Data Analysis (EDA) in Excel to highlight key business patterns and operational bottlenecks.',
      'Identified critical customer churn drivers, directly supporting a retention strategy that boosted customer retention by 15%.',
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Power BI based Human Resource Management',
    category: 'Enterprise BI & Data Modeling',
    metrics: 'End-to-End ETL Pipeline & Real-Time Workforce Analytics',
    summary:
      'Built a scalable Power BI-based ETL pipeline to ingest and process data from SQL Server, delivering real-time workforce insights, attrition trends, and productivity indicators.',
    techStack: ['Power BI Desktop', 'Power BI Service', 'SSMS', 'SQL Server', 'Excel', 'Power Query', 'DAX'],
    highlights: [
      'Engineered optimized data models and enhanced relational integrity between multiple relational data tables.',
      'Developed advanced DAX measures to enhance analytical depth and create scalable, intuitive dashboards.',
      'Automated scheduled data refreshes and transformations using Power Query and enterprise Power BI Gateway.',
      'Integrated diverse data sources including SQL Server, flat files, and Excel spreadsheets ensuring reliable sync.',
      'Implemented data quality controls, data lineage tracking, and a scalable architecture designed for future growth.',
    ],
    githubUrl: 'https://github.com/sheetal-giridhar/powerbi-hr-management',
    liveDemoUrl: 'https://app.powerbi.com/view?r=eyJrIjoiSheetal-HR-Dashboard',
  },
  {
    id: 'proj-2',
    title: 'Azure and Power BI based Sales Optimization',
    category: 'Cloud Data Pipeline & Predictive Analytics',
    metrics: 'Cloud-Native Automated Pipeline & KPI Tracking',
    summary:
      'Developed an automated and scalable analytics pipeline using SQL Server, Python, Power BI, and Azure (ADF & Databricks) to deliver business-ready dashboards and actionable revenue optimization insights.',
    techStack: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'SQL',
      'SSMS',
      'Hypothesis Testing',
      'Power BI Desktop',
      'Azure ADF',
      'Databricks',
    ],
    highlights: [
      'Loaded high-volume structured transactional data into SQL Server using SSMS with indexed, optimized queries.',
      'Applied custom Python statistical logic and data transformation routines for exploratory business insights.',
      'Developed curated datasets and executive-level reporting matrices in Power BI Desktop for granular KPI tracking.',
      'Closely collaborated with cross-functional BI teams to define core metric taxonomies and optimize query execution.',
    ],
    githubUrl: 'https://github.com/sheetal-giridhar/azure-sales-optimization-bi',
    liveDemoUrl: 'https://app.powerbi.com/view?r=eyJrIjoiSheetal-Sales-Optimization',
  },
];

export const certificationsData: Certification[] = [
  {
    id: 'cert-1',
    title: 'PG Diploma in Data Science and Machine Learning',
    issuer: 'Data Trained',
    year: '2021',
    badgeColor: 'blue',
  },
  {
    id: 'cert-2',
    title: 'Data Analyst Associate (Power BI)',
    issuer: 'Udemy',
    badgeColor: 'amber',
  },
  {
    id: 'cert-3',
    title: 'SQL for Data Analytics',
    issuer: 'Coursera',
    badgeColor: 'indigo',
  },
  {
    id: 'cert-4',
    title: 'Python for Data Science',
    issuer: 'Udemy',
    badgeColor: 'emerald',
  },
];

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'MCA (Master of Computer Application)',
    institution: 'Nitte Meenakshi Institute of Technology',
    year: '2017',
    notes: 'Postgraduate qualification with specialization in Computer Applications, Database Systems, Software Engineering, and Algorithmic Design.',
  },
  {
    id: 'edu-2',
    degree: 'BCA (Bachelor of Computer Application)',
    institution: 'MS Ramaiah College',
    year: '2015',
    notes: 'Undergraduate foundation in Computer Science, Data Structures, Mathematics, Programming, and Database Management.',
  },
];
