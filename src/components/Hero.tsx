import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  ArrowRight,
  ExternalLink,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';
import { resumeProfile } from '../data/resumeData';
import { generateResumePDF } from '../utils/pdfGenerator';

interface HeroProps {
  onOpenResumeModal: () => void;
  onSearchQuery?: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchQuery && searchTerm.trim()) {
      onSearchQuery(searchTerm.trim());
    } else {
      // Smooth scroll to skills or projects
      const target = document.getElementById('skills');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="pt-16 pb-24 md:pt-24 md:pb-32 bg-white dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Subtle Animated Google-Inspired Title / Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          {/* Subtle Google Colors Accent Dots */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white">
            Sheetal Giridhar
          </h1>

          <div className="text-lg sm:text-xl font-normal text-slate-500 dark:text-slate-400">
            <span>Data Analyst</span>
          </div>
        </motion.div>

        {/* Google-Inspired Clean Rounded Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-slate-300 dark:focus-within:border-slate-700 transition-all"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills, experience, projects, or degree..."
              className="flex-1 text-sm bg-transparent border-none text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </form>
        </motion.div>

        {/* Short Professional Introduction from Resume */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-balance">
            Experienced Data Analyst proficient in{' '}
            <strong className="font-medium text-slate-900 dark:text-white">Advanced Excel</strong>,{' '}
            <strong className="font-medium text-slate-900 dark:text-white">Power BI</strong>, and{' '}
            <strong className="font-medium text-slate-900 dark:text-white">SQL</strong>, with a strong business acumen. Skilled at transforming complex data into actionable insights and creating impactful visualizations to drive strategic decisions and operational efficiency.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span>Bengaluru, India</span>
            <span aria-hidden="true">·</span>
            <span>MCA (2017)</span>
            <span aria-hidden="true">·</span>
            <span>+91 8310751419</span>
          </div>
        </motion.div>

        {/* Google-Inspired Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            Explore Portfolio
          </a>

          <button
            onClick={() => generateResumePDF()}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors inline-flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>Download Resume</span>
          </button>

          <button
            onClick={onOpenResumeModal}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            View Full CV Doc
          </button>
        </motion.div>

      </div>
    </section>
  );
};
