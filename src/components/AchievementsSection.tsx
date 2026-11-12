import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  BarChart3,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface AchievementItem {
  id: string;
  metricNumber: number;
  prefix?: string;
  suffix: string;
  title: string;
  company: string;
  period: string;
  description: string;
  color: string;
  dotColor: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-reporting-accuracy',
    metricNumber: 25,
    prefix: '+',
    suffix: '%',
    title: 'Improvement in Reporting Accuracy',
    company: 'Microline Information Systems',
    period: 'Jun 2024 – Jul 2025',
    description: 'Implemented data validation frameworks and automated controls across ERP and CRM integrations into central BI dashboards.',
    color: '#4285F4', // Google Blue
    dotColor: 'bg-[#4285F4]',
    icon: <BarChart3 className="w-5 h-5 text-[#4285F4]" />,
  },
  {
    id: 'ach-cycle-time',
    metricNumber: 55,
    prefix: '',
    suffix: '%',
    title: 'Reduction in Reporting Cycle Time',
    company: 'TSQUARE HR Consulting Pvt Ltd',
    period: 'Apr 2021 – Jun 2023',
    description: 'Designed and developed interactive dashboards for sales and finance teams, automating scheduled reporting using SQL & Python pipelines.',
    color: '#34A853', // Google Green
    dotColor: 'bg-[#34A853]',
    icon: <Clock className="w-5 h-5 text-[#34A853]" />,
  },
  {
    id: 'ach-demand-planning',
    metricNumber: 18,
    prefix: '+',
    suffix: '%',
    title: 'Improvement in Demand Planning Accuracy',
    company: 'TSQUARE HR Consulting Pvt Ltd',
    period: 'Apr 2021 – Jun 2023',
    description: 'Built a sales forecast model using statistical methods (regression, correlation, hypothesis testing) to improve business planning.',
    color: '#EA4335', // Google Red
    dotColor: 'bg-[#EA4335]',
    icon: <TrendingUp className="w-5 h-5 text-[#EA4335]" />,
  },
  {
    id: 'ach-retention',
    metricNumber: 15,
    prefix: '+',
    suffix: '%',
    title: 'Improvement in Customer Retention',
    company: 'Infosys',
    period: 'Dec 2018 – Nov 2019',
    description: 'Identified customer churn drivers through EDA in Excel and SQL queries, directly supporting an enterprise strategy that preserved key client relationships.',
    color: '#FBBC05', // Google Yellow
    dotColor: 'bg-[#FBBC05]',
    icon: <Users className="w-5 h-5 text-[#FBBC05]" />,
  },
];

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>Verified Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
            Measurable Achievements
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Concrete performance metrics achieved across enterprise analytics, data validation, and forecast modeling.
          </p>
        </div>

        {/* 4 Clean Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Metric Icon & Dot */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    {item.icon}
                  </div>
                  <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                </div>

                {/* Animated Number Counter */}
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white tabular-nums">
                    <AnimatedCounter
                      value={item.metricNumber}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={1500}
                    />
                  </div>
                  <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Company & Role */}
                <div className="text-xs text-slate-400 dark:text-slate-500">
                  <span className="font-medium text-slate-600 dark:text-slate-400">{item.company}</span>
                  <div className="mt-0.5">{item.period}</div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
