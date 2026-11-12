import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { educationData, certificationsData } from '../data/resumeData';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Education Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Academic Degrees
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900 dark:text-white">
                Education
              </h2>
            </div>

            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <div className="text-sm text-[#4285F4] font-medium mt-0.5">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {edu.year}
                    </span>
                  </div>

                  {edu.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                      {edu.notes}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Credentials
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900 dark:text-white">
                Certifications
              </h2>
            </div>

            <div className="space-y-3.5">
              {certificationsData.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 text-[#34A853]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {cert.title}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-slate-400 shrink-0">
                    Verified
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
