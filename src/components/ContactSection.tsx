import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Send,
  MessageSquare,
} from 'lucide-react';
import { resumeProfile } from '../data/resumeData';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Reach out directly for data analytics, software engineering, or AI-driven development roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Direct Contact Info from Resume */}
          <div className="space-y-4">
            
            {/* Phone */}
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#34A853]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase">
                    Phone Number
                  </div>
                  <a
                    href={`tel:${resumeProfile.phone}`}
                    className="text-sm font-medium text-slate-900 dark:text-white hover:text-[#4285F4]"
                  >
                    {resumeProfile.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(resumeProfile.phone, 'phone')}
                title="Copy phone number"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                {copiedKey === 'phone' ? <Check className="w-4 h-4 text-[#34A853]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#EA4335] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-slate-400 uppercase">
                    Email Address
                  </div>
                  <a
                    href={`mailto:${resumeProfile.email}`}
                    className="text-sm font-medium text-slate-900 dark:text-white hover:text-[#4285F4] truncate block"
                  >
                    {resumeProfile.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(resumeProfile.email, 'email')}
                title="Copy email address"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
              >
                {copiedKey === 'email' ? <Check className="w-4 h-4 text-[#34A853]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn */}
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#4285F4] shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-400 uppercase">
                    LinkedIn Profile
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    sheetal-giridhar
                  </div>
                </div>
              </div>
              <a
                href={resumeProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Open LinkedIn profile"
                className="p-2 rounded-lg text-slate-400 hover:text-[#4285F4] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Based in Bengaluru, India. Available for full-time engineering and analytics opportunities.
            </div>

          </div>

          {/* Clean Inquiry Form */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950/60 text-[#34A853] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Message Logged
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Thank you for reaching out. You can also contact Sheetal directly via email at {resumeProfile.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    Direct Inquiry
                  </h3>
                  <p className="text-xs text-slate-400">
                    Send a quick professional message.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recruiter or Hiring Team"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-[#4285F4]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-[#4285F4]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Role details or collaboration proposal..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-[#4285F4] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full text-xs font-medium bg-[#4285F4] hover:bg-blue-600 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
