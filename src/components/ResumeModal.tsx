import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  Linkedin,
  Mail,
  Phone,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  resumeProfile,
  experienceData,
  projectsData,
  certificationsData,
  educationData,
} from '../data/resumeData';
import { generateResumePDF } from '../utils/pdfGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activePage, setActivePage] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-full-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto no-print"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Controls Header */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Sheetal Giridhar — Full Curriculum Vitae
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Exact document reproduction (2 Pages)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Page Toggles for preview */}
            <div className="hidden sm:flex items-center bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setActivePage(1)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activePage === 1
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Page 1
              </button>
              <button
                onClick={() => setActivePage(2)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activePage === 2
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Page 2
              </button>
            </div>

            <button
              onClick={handlePrint}
              id="resume-modal-print-btn"
              title="Print document"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => generateResumePDF()}
              id="resume-modal-download-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              id="resume-modal-close-btn"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200/60 dark:bg-slate-950 flex justify-center">
          
          {/* Simulated A4 Paper */}
          <div className="w-full max-w-[760px] bg-white text-slate-900 shadow-xl rounded-sm p-6 sm:p-10 font-sans border border-slate-300">
            
            {activePage === 1 ? (
              /* PAGE 1 CONTENT */
              <div className="space-y-6">
                
                {/* Header Name & Title */}
                <div className="text-center pb-4 border-b border-slate-900/80">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-widest uppercase text-slate-900">
                    S H E E T A L &nbsp; G I R I D H A R
                  </h1>
                  <h2 className="text-sm sm:text-base font-bold tracking-wider text-slate-800 mt-1 uppercase">
                    DATA ANALYST
                  </h2>
                </div>

                {/* Two Column: CONTACT & PROFILE */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pb-4 border-b border-slate-300">
                  <div className="sm:col-span-4 space-y-1.5 text-xs text-slate-800">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                      CONTACT
                    </h3>
                    <div className="font-medium text-slate-800">{resumeProfile.phone}</div>
                    <div className="font-medium text-slate-800 break-all">{resumeProfile.email}</div>
                    <a
                      href={resumeProfile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold underline block"
                    >
                      linkedin.com/in/sheetal-giridhar/
                    </a>
                  </div>

                  <div className="sm:col-span-8 space-y-1.5 text-xs text-slate-800">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                      PROFILE
                    </h3>
                    <p className="leading-relaxed text-slate-700">
                      {resumeProfile.profileSummary}
                    </p>
                  </div>
                </div>

                {/* Two Main Columns: SKILLS & EXPERIENCE */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  
                  {/* Left Column: SKILLS */}
                  <div className="sm:col-span-4 space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                      SKILLS
                    </h3>

                    <div className="space-y-3.5 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">Advanced Excel</div>
                        <div className="text-[11px] text-slate-600 leading-snug">
                          (Pivot Tables, Macros, Power Query)
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">Power BI</div>
                        <div className="text-[11px] text-slate-600 leading-snug">
                          (DAX, Power Query, Dashboard Design, Statistical Analysis)
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">MS SQL</div>
                        <div className="text-[11px] text-slate-600 leading-snug">
                          (Joins, Stored Procedures, Optimization, Data Extraction)
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">Python</div>
                        <div className="text-[11px] text-slate-600 leading-snug">
                          (Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization)
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">ETL Skills</div>
                        <div className="text-[11px] text-slate-600 leading-snug">
                          (Data Cleaning, Data Modeling, ETL concepts)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: EXPERIENCE (Part 1) */}
                  <div className="sm:col-span-8 space-y-5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                      EXPERIENCE
                    </h3>

                    {/* Microline */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-slate-900 uppercase">
                            MICROLINE INFORMATION SYSTEMS
                          </div>
                          <div className="font-semibold text-slate-700">Data Analyst</div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          📍 Jun 2024 - Jul 2025
                        </span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 leading-relaxed text-[11.5px]">
                        <li>Led data analysis projects to track <strong>KPIs</strong> for supply chain and customer experience.</li>
                        <li>Worked with large datasets using <strong>SQL, Python (Pandas, NumPy)</strong> for trend analysis.</li>
                        <li>Integrated data from <strong>ERP/CRM systems</strong> into central BI dashboards.</li>
                        <li>Improved reporting accuracy by <strong>25%</strong> by implementing data validation frameworks.</li>
                      </ul>
                    </div>

                    {/* TSQUARE HR */}
                    <div className="space-y-1.5 text-xs pt-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-slate-900 uppercase">
                            TSQUARE HR CONSULTING Pvt Ltd
                          </div>
                          <div className="font-semibold text-slate-700">Data Analyst</div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          📍 Apr 2021 - Jun 2023
                        </span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 leading-relaxed text-[11.5px]">
                        <li>Designed and developed interactive dashboards for sales and finance teams, reducing reporting cycle time by <strong>55%</strong>.</li>
                        <li>Conducted <strong>A/B testing analysis</strong> to measure campaign performance.</li>
                        <li>Applied statistical methods (<strong>regression, correlation, hypothesis testing</strong>) to support business decisions.</li>
                        <li>Created data pipelines using <strong>SQL & Python</strong> for automated reporting.</li>
                        <li>Documented business requirements and delivered BI solutions for stakeholders.</li>
                        <li>Built a sales forecast model that improved demand planning accuracy by <strong>18%</strong>.</li>
                      </ul>
                    </div>

                  </div>

                </div>

                <div className="text-center pt-6 text-[10px] text-slate-400 font-medium">
                  Page 1 of 2 • Sheetal Giridhar Resume
                </div>

              </div>
            ) : (
              /* PAGE 2 CONTENT */
              <div className="space-y-6">
                
                {/* Two Main Columns: EDUCATION & CERTIFICATIONS (Left) and INFOSYS & PROJECTS (Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  
                  {/* Left Column: EDUCATION & CERTIFICATIONS */}
                  <div className="sm:col-span-5 space-y-6">
                    
                    {/* Education */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                        EDUCATION
                      </h3>
                      
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900">
                          Nitte Meenakshi Institute of Technology
                        </div>
                        <div className="text-slate-700">
                          MCA(Master of Computer Application) – 2017
                        </div>
                      </div>

                      <div className="text-xs space-y-1 pt-1">
                        <div className="font-bold text-slate-900">
                          MS Ramaiah College
                        </div>
                        <div className="text-slate-700">
                          BCA(Bachelor of Computer Application) – 2015
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3 pt-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                        CERTIFICATIONS
                      </h3>

                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900">Data Trained</div>
                        <div className="text-slate-700">
                          PG Diploma in Data Science and Machine Learning – 2021
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900">Udemy</div>
                        <div className="text-slate-700">
                          Data Analyst Associate (Power BI)
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900">Coursera</div>
                        <div className="text-slate-700">
                          SQL for Data Analytics
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900">Udemy</div>
                        <div className="text-slate-700">
                          Python for Data Science
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: INFOSYS EXPERIENCE + PROJECTS */}
                  <div className="sm:col-span-7 space-y-5">
                    
                    {/* Infosys Experience */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-slate-900 uppercase">
                            Infosys
                          </div>
                          <div className="font-semibold text-slate-700">Junior Analyst</div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          📍 Dec 2018 – Nov 2019
                        </span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 leading-relaxed text-[11.5px]">
                        <li>Gathered, cleaned and validated raw data from multiple sources.</li>
                        <li>Built dashboards in <strong>Tableau / Power BI</strong> to visualize sales and operations data.</li>
                        <li>Performed <strong>SQL queries</strong> for data extraction and ad-hoc reporting.</li>
                        <li>Conducted <strong>EDA in Excel</strong> to highlight key business patterns.</li>
                        <li>Identified customer churn drivers, supporting a strategy that boosted retention by <strong>15%</strong>.</li>
                      </ul>
                    </div>

                    {/* Projects */}
                    <div className="space-y-4 pt-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                        PROJECTS
                      </h3>

                      {/* Project 1 */}
                      <div className="space-y-1.5 text-xs">
                        <div className="font-bold text-slate-900">
                          Project 1: Power BI based Human Resource Management
                        </div>
                        <p className="text-slate-700 text-[11.5px] leading-relaxed">
                          <strong>Summary:</strong> Built a scalable Power BI-based ETL Pipeline to ingest and process data from SQL Server and delivering real-time insights on workforce.
                        </p>
                        <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 text-[11px] leading-relaxed">
                          <li>Preparing optimized Data Models and enhancing relationship between data tables.</li>
                          <li>Worked on DAX measures to improving analytical depth and build scalable Dashboards.</li>
                          <li>Automated data refreshes and transformations using Power Query and Power BI Gateway.</li>
                          <li>Integrating multiple sources including SQL server, excel sheets and ensuring updates.</li>
                          <li>Ensured data quality, lineage tracking, and scalable architecture for future growth.</li>
                        </ul>
                        <div className="text-[11px] text-slate-600 font-semibold">
                          Tech Stack: Power BI Desktop, Power BI Service, SSMS, Excel.
                        </div>
                      </div>

                      {/* Project 2 */}
                      <div className="space-y-1.5 text-xs pt-1">
                        <div className="font-bold text-slate-900">
                          Project 2: Azure and Power BI based Sales Optimization
                        </div>
                        <p className="text-slate-700 text-[11.5px] leading-relaxed">
                          <strong>Summary:</strong> Developed an automated and scalable analytics pipeline using SQL Server, Python, Power BI, and Azure (ADF & Databricks) to deliver business-ready dashboards and insights.
                        </p>
                        <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 text-[11px] leading-relaxed">
                          <li>Loaded structured data into SQL Server using SSMS and optimized queries.</li>
                          <li>Applied transformation and statistical logic in python for business insights.</li>
                          <li>Developed curated datasets in power bi desktop for reporting and KPI tracking.</li>
                          <li>Closely collaborated with BI teams to define KPIs and improve dashboard performance.</li>
                        </ul>
                        <div className="text-[11px] text-slate-600 font-semibold">
                          Tech Stack: Python (Matplotlib, Seaborn, Pandas), SQL, SSMS, Hypothesis Testing, SQL, Power BI desktop, Azure.
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="text-center pt-6 text-[10px] text-slate-400 font-medium">
                  Page 2 of 2 • Sheetal Giridhar Resume
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage(1)}
              className={`px-3 py-1 rounded-md font-semibold ${
                activePage === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              View Page 1
            </button>
            <button
              onClick={() => setActivePage(2)}
              className={`px-3 py-1 rounded-md font-semibold ${
                activePage === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              View Page 2
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => generateResumePDF()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
