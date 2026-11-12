import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementsSection } from './components/AchievementsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { FloatingChatbot } from './components/FloatingChatbot';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import {
  resumeProfile,
  experienceData,
  projectsData,
  certificationsData,
  educationData,
  skillsData,
} from './data/resumeData';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sg_theme');
      if (saved) return saved === 'dark';
      return false; // Default to Google-clean white aesthetic
    }
    return false;
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sg_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sg_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Screen Interactive Web View */}
      <div className="no-print flex-1 flex flex-col">
        {/* Minimal Navigation */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        <main className="flex-1">
          {/* 1. HOME / HERO: Centered Google-inspired layout, rounded search bar, animated text */}
          <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

          {/* 2. ACHIEVEMENTS: 25% reporting accuracy, 55% cycle time, 18% demand forecast, 15% retention */}
          <AchievementsSection />

          {/* 3. ABOUT ME: Professional summary from the resume */}
          <AboutSection />

          {/* 4. SKILLS: Technical skills & relevant subskills */}
          <SkillsSection />

          {/* 5. EXPERIENCE: Clean professional timeline with companies, roles, dates & responsibilities */}
          <ExperienceSection />

          {/* 6. PROJECTS: Power BI HR Management & Azure/Power BI Sales Optimization */}
          <ProjectsSection />

          {/* 7. EDUCATION AND CERTIFICATIONS */}
          <EducationCertifications />

          {/* 8. CONTACT: Resume contact information & networking inquiry */}
          <ContactSection />
        </main>

        {/* Minimal Footer */}
        <Footer onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* Floating AI Chatbot in bottom-right */}
        <FloatingChatbot />

        {/* Full 2-Page CV Document Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>

      {/* Print-Only Pure 2-Page CV Document for Ctrl+P */}
      <div className="print-only p-8 text-black bg-white font-sans text-xs">
        {/* PAGE 1 PRINT */}
        <div className="space-y-6 pb-12">
          <div className="text-center border-b-2 border-black pb-4">
            <h1 className="text-3xl font-black tracking-widest uppercase">
              S H E E T A L &nbsp; G I R I D H A R
            </h1>
            <h2 className="text-base font-bold tracking-wider uppercase mt-1">
              DATA ANALYST
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 border-b border-gray-300 pb-4">
            <div className="col-span-4 space-y-1">
              <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                CONTACT
              </h3>
              <div>{resumeProfile.phone}</div>
              <div>{resumeProfile.email}</div>
              <div>linkedin.com/in/sheetal-giridhar/</div>
            </div>
            <div className="col-span-8 space-y-1">
              <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                PROFILE
              </h3>
              <p className="leading-relaxed">{resumeProfile.profileSummary}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 space-y-4">
              <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                SKILLS
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-bold">Advanced Excel</div>
                  <div className="text-[11px] text-gray-700">(Pivot Tables, Macros, Power Query)</div>
                </div>
                <div>
                  <div className="font-bold">Power BI</div>
                  <div className="text-[11px] text-gray-700">(DAX, Power Query, Dashboard Design, Statistical Analysis)</div>
                </div>
                <div>
                  <div className="font-bold">MS SQL</div>
                  <div className="text-[11px] text-gray-700">(Joins, Stored Procedures, Optimization, Data Extraction)</div>
                </div>
                <div>
                  <div className="font-bold">Python</div>
                  <div className="text-[11px] text-gray-700">(Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization)</div>
                </div>
                <div>
                  <div className="font-bold">ETL Skills</div>
                  <div className="text-[11px] text-gray-700">(Data Cleaning, Data Modeling, ETL concepts)</div>
                </div>
              </div>
            </div>

            <div className="col-span-8 space-y-5">
              <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                EXPERIENCE
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>MICROLINE INFORMATION SYSTEMS</span>
                  <span>📍 Jun 2024- Jul 2025</span>
                </div>
                <div className="font-semibold text-gray-700">Data Analyst</div>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px]">
                  {experienceData[0].points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-2">
                <div className="flex justify-between font-bold">
                  <span>TSQUARE HR CONSULTING Pvt Ltd</span>
                  <span>📍 Apr 2021 - Jun 2023</span>
                </div>
                <div className="font-semibold text-gray-700">Data Analyst</div>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px]">
                  {experienceData[1].points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 PRINT */}
        <div className="space-y-6 pt-12" style={{ pageBreakBefore: 'always' }}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-5 space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                  EDUCATION
                </h3>
                {educationData.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="font-bold">{edu.institution}</div>
                    <div className="text-gray-700">{edu.degree} – {edu.year}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                  CERTIFICATIONS
                </h3>
                {certificationsData.map((cert) => (
                  <div key={cert.id} className="space-y-0.5">
                    <div className="font-bold">{cert.issuer}</div>
                    <div className="text-gray-700">{cert.title} {cert.year ? `– ${cert.year}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-7 space-y-5">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Infosys</span>
                  <span>📍 Dec 2018 – Nov 2019</span>
                </div>
                <div className="font-semibold text-gray-700">Junior Analyst</div>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px]">
                  {experienceData[2].points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="font-bold uppercase text-xs border-b border-gray-400 pb-1">
                  PROJECTS
                </h3>
                {projectsData.map((p) => (
                  <div key={p.id} className="space-y-1 text-xs">
                    <div className="font-bold">{p.title}</div>
                    <p className="text-[11px] text-gray-800 leading-snug">
                      <strong>Summary:</strong> {p.summary}
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5 text-[10.5px]">
                      {p.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                    <div className="text-[10px] text-gray-600 font-semibold">
                      Tech Stack: {p.techStack.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
