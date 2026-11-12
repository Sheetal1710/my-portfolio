import React from 'react';
import {
  Download,
  Linkedin,
  Github,
  Mail,
  Phone,
  ArrowUp,
} from 'lucide-react';
import { resumeProfile } from '../data/resumeData';
import { generateResumePDF } from '../utils/pdfGenerator';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-500 py-12 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
            <span>Sheetal Giridhar</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-500 font-normal">Data Analyst · MCA</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a
              href={resumeProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={resumeProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${resumeProfile.email}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <button
              onClick={onOpenResumeModal}
              className="hover:text-slate-900 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              Resume Doc
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 text-[11px] text-slate-400">
          <div>
            Bengaluru, India · Content strictly based on official resume documents
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
