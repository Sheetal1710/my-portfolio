export interface Achievement {
  id: string;
  metric: string;
  label: string;
  organization: string;
  period: string;
  detail: string;
  category: 'efficiency' | 'accuracy' | 'revenue' | 'academic';
  tags: string[];
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-1',
    metric: '55%',
    label: 'Reporting Cycle Time Reduction',
    organization: 'TSQUARE HR Consulting Pvt Ltd',
    period: 'Apr 2021 – Jun 2023',
    detail: 'Designed and deployed interactive dashboards for sales and finance teams, slashing manual reporting cycle time from weeks to hours with automated SQL and Python pipelines.',
    category: 'efficiency',
    tags: ['Power BI', 'SQL', 'Automation', 'Python']
  },
  {
    id: 'ach-2',
    metric: '+25%',
    label: 'Reporting Accuracy Increase',
    organization: 'Microline Information Systems',
    period: 'Jun 2024 – Jul 2025',
    detail: 'Implemented strict data validation frameworks and automated data lineage checks across ERP and CRM systems into centralized BI dashboards, eliminating audit discrepancies.',
    category: 'accuracy',
    tags: ['Data Validation', 'ERP/CRM', 'Quality Control', 'Power BI']
  },
  {
    id: 'ach-3',
    metric: '+18%',
    label: 'Sales Demand Forecast Accuracy',
    organization: 'TSQUARE HR Consulting Pvt Ltd',
    period: 'Apr 2021 – Jun 2023',
    detail: 'Engineered an end-to-end sales predictive model applying regression, correlation, and statistical hypothesis testing to optimize inventory and demand planning.',
    category: 'revenue',
    tags: ['Predictive Modeling', 'Statistical Analysis', 'Regression']
  },
  {
    id: 'ach-4',
    metric: '+15%',
    label: 'Customer Retention Rate Lift',
    organization: 'Infosys',
    period: 'Dec 2018 – Nov 2019',
    detail: 'Conducted exploratory data analysis (EDA) and SQL churn identification on enterprise sales data, formulating actionable customer retention strategies that preserved high-value accounts.',
    category: 'revenue',
    tags: ['Customer Churn', 'EDA', 'SQL', 'Tableau']
  },
  {
    id: 'ach-5',
    metric: 'Cloud ETL',
    label: 'Azure Databricks & ADF Pipeline',
    organization: 'Azure & Power BI Sales Optimization',
    period: 'Cloud Production Architecture',
    detail: 'Architected automated cloud-native analytics ingestion using Azure Data Factory, Databricks, SSMS SQL Server, and Power BI Desktop for live enterprise KPI tracking.',
    category: 'efficiency',
    tags: ['Azure ADF', 'Databricks', 'Cloud SQL', 'Python']
  },
  {
    id: 'ach-6',
    metric: 'MCA',
    label: 'Master of Computer Application',
    organization: 'Nitte Meenakshi Institute of Technology',
    period: 'Postgraduate 2017',
    detail: 'Comprehensive academic foundation in software engineering, algorithms, database architectures, and distributed systems, complemented with BCA in 2015 from MS Ramaiah College.',
    category: 'academic',
    tags: ['Software Engineering', 'Database Systems', 'Algorithms']
  }
];
