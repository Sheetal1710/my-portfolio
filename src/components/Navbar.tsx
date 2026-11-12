import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  FileText,
  Download,
  Menu,
  X,
} from 'lucide-react';
import { generateResumePDF } from '../utils/pdfGenerator';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenResumeModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'achievements', 'about-me', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#about', id: 'about' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'About', href: '#about-me', id: 'about-me' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-2xs'
          : 'bg-white dark:bg-slate-950 border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Google-Inspired Clean Minimal Wordmark */}
        <a
          href="#about"
          className="flex items-center gap-2 group focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center font-semibold text-xs tracking-tight text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 group-hover:border-slate-300">
            SG
          </div>
          <span className="text-sm font-medium tracking-tight text-slate-800 dark:text-slate-200">
            Sheetal Giridhar
          </span>
        </a>

        {/* Desktop Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-[13px] font-normal text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`transition-colors hover:text-slate-950 dark:hover:text-white ${
                activeSection === link.id
                  ? 'text-slate-950 dark:text-white font-medium border-b-2 border-[#4285F4] pb-1'
                  : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => generateResumePDF()}
            title="Download full CV as PDF"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2 text-xs">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg ${
                activeSection === link.id
                  ? 'text-slate-950 dark:text-white font-medium bg-slate-50 dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                generateResumePDF();
              }}
              className="w-full py-2 text-center text-xs font-medium bg-slate-100 dark:bg-slate-850 rounded-lg text-slate-800 dark:text-slate-200"
            >
              Download CV (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
