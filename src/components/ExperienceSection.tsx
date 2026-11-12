import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { experienceData } from '../data/resumeData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Work History
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
            Professional Experience
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional roles, verified company tenures, and responsibilities directly from the resume.
          </p>
        </div>

        {/* Clean Minimal Timeline */}
        <div className="space-y-8 relative">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                    <span className="font-medium text-[#4285F4]">{exp.company}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {exp.period}
                </div>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {exp.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tools footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px]">TOOLS:</span>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
