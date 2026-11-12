import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  BarChart3,
  Database,
  Code2,
  Workflow,
  Check,
} from 'lucide-react';
import { skillsData } from '../data/resumeData';

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-[#34A853]" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#4285F4]" />;
      case 'Database':
        return <Database className="w-5 h-5 text-[#EA4335]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#FBBC05]" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-[#4285F4]" />;
      default:
        return <Code2 className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredSkills =
    activeFilter === 'all'
      ? skillsData
      : skillsData.filter((cat) =>
          cat.title.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Technical Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
            Skills & Subskills
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            All technical competencies and specialized subskills explicitly listed in Sheetal's resume.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    {getSkillIcon(category.iconName)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {category.skills.length} Subskills
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Subskills listing */}
              <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                {category.skills.map((subskill) => (
                  <div
                    key={subskill}
                    className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Check className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                    <span>{subskill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
