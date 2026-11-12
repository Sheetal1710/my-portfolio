export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  points: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  metrics?: string;
  category: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  badgeColor?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  notes?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  description: string;
  iconName: string;
}

export interface ResumeProfile {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
  profileSummary: string;
  aspirations: string;
}
