import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { projectsData } from '../data/resumeData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
            Projects
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Enterprise analytics solutions, automated ETL pipelines, and business intelligence dashboards.
          </p>
        </div>

        {/* 2 Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-5">
                
                {/* Tag & Index */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-[#4285F4]">
                    Project 0{idx + 1}
                  </span>
                  <span>{project.category}</span>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Key Responsibilities / Highlights from Resume */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Responsibilities & Implementation
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Stack */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-medium text-slate-400 uppercase">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Links */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#4285F4] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/sheetal-giridhar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#4285F4] hover:underline"
                >
                  <span>Discuss Case Study</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
