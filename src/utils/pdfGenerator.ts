import { jsPDF } from 'jspdf';
import {
  resumeProfile,
  experienceData,
  projectsData,
  certificationsData,
  educationData,
  skillsData,
} from '../data/resumeData';

export function generateResumePDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryColor = [20, 24, 33]; // Dark Slate
  const accentColor = [59, 130, 246]; // Modern Blue
  const mutedColor = [100, 116, 139]; // Muted text
  const lineColor = [226, 232, 240]; // Border line

  // PAGE 1
  let y = margin + 5;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('S H E E T A L   G I R I D H A R', pageWidth / 2, y, { align: 'center' });

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('DATA ANALYST', pageWidth / 2, y, { align: 'center' });

  y += 4;
  doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 7;

  // Two Column Header: CONTACT (Left) and PROFILE (Right)
  const col1X = margin;
  const col2X = margin + 55;
  const col2Width = contentWidth - 55;

  // Column 1: Contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CONTACT', col1X, y);

  // Column 2: Profile
  doc.text('PROFILE', col2X, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);

  doc.text(resumeProfile.phone, col1X, y);
  doc.text(resumeProfile.email, col1X, y + 4.5);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('linkedin.com/in/sheetal-giridhar', col1X, y + 9);

  // Profile text right side
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const profileLines = doc.splitTextToSize(resumeProfile.profileSummary, col2Width);
  doc.text(profileLines, col2X, y);

  y += 18;
  doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
  doc.line(margin, y, pageWidth - margin, y);

  y += 7;

  // Two Main Columns: SKILLS (Left) and EXPERIENCE (Right)
  const skillsColX = margin;
  const skillsColWidth = 50;
  const expColX = margin + 55;
  const expColWidth = contentWidth - 55;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SKILLS', skillsColX, y);
  doc.text('EXPERIENCE', expColX, y);

  let skillsY = y + 6;
  let expY = y + 6;

  // Draw Skills on Left Column
  const rawSkills = [
    { title: 'Advanced Excel', sub: '(Pivot Tables, Macros, Power Query)' },
    { title: 'Power BI', sub: '(DAX, Power Query, Dashboard Design, Statistical Analysis)' },
    { title: 'MS SQL', sub: '(Joins, Stored Procedures, Optimization, Data Extraction)' },
    { title: 'Python', sub: '(Pandas, NumPy, Matplotlib, Seaborn for data analysis & visualization)' },
    { title: 'ETL Skills', sub: '(Data Cleaning, Data Modeling, ETL concepts)' },
  ];

  rawSkills.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(sk.title, skillsColX, skillsY);
    skillsY += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    const subLines = doc.splitTextToSize(sk.sub, skillsColWidth);
    doc.text(subLines, skillsColX, skillsY);
    skillsY += subLines.length * 3.5 + 4;
  });

  // Draw Experience 1 & 2 on Right Column
  const exp1 = experienceData[0]; // Microline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(exp1.company.toUpperCase(), expColX, expY);
  expY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`${exp1.role}`, expColX, expY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text(`   ${exp1.period}`, expColX + 25, expY);
  expY += 4.5;

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  exp1.points.forEach((pt) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const bulletText = `•  ${pt}`;
    const lines = doc.splitTextToSize(bulletText, expColWidth);
    doc.text(lines, expColX, expY);
    expY += lines.length * 3.4 + 1.5;
  });

  expY += 3;

  const exp2 = experienceData[1]; // TSQUARE HR Consulting
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(exp2.company.toUpperCase(), expColX, expY);
  expY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`${exp2.role}`, expColX, expY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text(`   ${exp2.period}`, expColX + 25, expY);
  expY += 4.5;

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  exp2.points.forEach((pt) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const bulletText = `•  ${pt}`;
    const lines = doc.splitTextToSize(bulletText, expColWidth);
    doc.text(lines, expColX, expY);
    expY += lines.length * 3.4 + 1.5;
  });

  // Footer note page 1
  doc.setFontSize(7.5);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Sheetal Giridhar • Curriculum Vitae — Page 1 of 2', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // PAGE 2
  doc.addPage();
  y = margin + 5;

  // Two Column Layout Page 2: Left (EDUCATION & CERTIFICATIONS), Right (INFOSYS & PROJECTS)
  const leftColX = margin;
  const leftColWidth = 50;
  const rightColX = margin + 55;
  const rightColWidth = contentWidth - 55;

  // Left Column: Education & Certifications
  let leftY = y;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('EDUCATION', leftColX, leftY);
  leftY += 6;

  educationData.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const instLines = doc.splitTextToSize(edu.institution, leftColWidth);
    doc.text(instLines, leftColX, leftY);
    leftY += instLines.length * 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    const degLines = doc.splitTextToSize(`${edu.degree} – ${edu.year}`, leftColWidth);
    doc.text(degLines, leftColX, leftY);
    leftY += degLines.length * 3.5 + 4;
  });

  leftY += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CERTIFICATIONS', leftColX, leftY);
  leftY += 6;

  certificationsData.forEach((cert) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(cert.issuer, leftColX, leftY);
    leftY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    const certTitle = cert.year ? `${cert.title} – ${cert.year}` : cert.title;
    const titleLines = doc.splitTextToSize(certTitle, leftColWidth);
    doc.text(titleLines, leftColX, leftY);
    leftY += titleLines.length * 3.5 + 3.5;
  });

  // Right Column: Infosys Experience + Projects
  let rightY = y;

  const exp3 = experienceData[2]; // Infosys
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(exp3.company, rightColX, rightY);
  rightY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`${exp3.role}`, rightColX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text(`   ${exp3.period}`, rightColX + 25, rightY);
  rightY += 4.5;

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  exp3.points.forEach((pt) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const bulletText = `•  ${pt}`;
    const lines = doc.splitTextToSize(bulletText, rightColWidth);
    doc.text(lines, rightColX, rightY);
    rightY += lines.length * 3.4 + 1.2;
  });

  rightY += 6;

  // Projects Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('PROJECTS', rightColX, rightY);
  rightY += 6;

  // Project 1
  const p1 = projectsData[0];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Project 1: ${p1.title}`, rightColX, rightY);
  rightY += 3.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const p1Summary = doc.splitTextToSize(`Summary: ${p1.summary}`, rightColWidth);
  doc.text(p1Summary, rightColX, rightY);
  rightY += p1Summary.length * 3.4 + 1.5;

  p1.highlights.forEach((h) => {
    const lines = doc.splitTextToSize(`• ${h}`, rightColWidth);
    doc.text(lines, rightColX, rightY);
    rightY += lines.length * 3.3 + 1;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(`Tech Stack: ${p1.techStack.join(', ')}`, rightColX, rightY);
  rightY += 6;

  // Project 2
  const p2 = projectsData[1];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Project 2: ${p2.title}`, rightColX, rightY);
  rightY += 3.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const p2Summary = doc.splitTextToSize(`Summary: ${p2.summary}`, rightColWidth);
  doc.text(p2Summary, rightColX, rightY);
  rightY += p2Summary.length * 3.4 + 1.5;

  p2.highlights.forEach((h) => {
    const lines = doc.splitTextToSize(`• ${h}`, rightColWidth);
    doc.text(lines, rightColX, rightY);
    rightY += lines.length * 3.3 + 1;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(`Tech Stack: ${p2.techStack.join(', ')}`, rightColX, rightY);

  // Footer note page 2
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Sheetal Giridhar • Curriculum Vitae — Page 2 of 2', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save the document
  doc.save('Sheetal_Giridhar_CV.pdf');
}
