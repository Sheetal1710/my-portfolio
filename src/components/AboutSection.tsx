import React from 'react';
import { motion } from 'framer-motion';
import { resumeProfile } from '../data/resumeData';
import { CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-me" className="py-24 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Professional Summary
          </div>
          <h2 className="text-3xl font-normal tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-[#4285F4] font-semibold text-sm">
              SG
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-900 dark:text-white">
                {resumeProfile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Data Analyst · MCA (2017)
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            {resumeProfile.profileSummary}
          </p>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">CORE TOOLS</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Power BI, MS SQL, Excel, Python</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">LOCATION</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Bengaluru, India</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">FOCUS AREAS</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Software Engineering & AI-Driven Roles</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
