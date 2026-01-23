
import { NavItem, EditorialBoardMember, Issue, UserProfile, Manuscript } from './types';

export const JOURNAL_TITLE = "Journal of Multidisciplinary Research Horizon (JMRH)";
export const PUBLISHER = "JMRH Publications";
export const ADDRESS = "Gudalur, The Nilgiris – 643212, Tamil Nadu, India";

export const CONTACT_EMAILS = {
  GENERAL: "jmrhpublications@gmail.com",
  EDITOR: "editor.jmrh@gmail.com",
  SUBMISSION: "submit.jmrh@gmail.com",
  REVIEW: "review.jmrh@gmail.com"
};

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Editorial Board', href: '/editorial' },
  { label: 'Reviewer Board', href: '/reviewer' },
  { label: 'Archives', href: '/archives' },
  { label: 'Guidelines', href: '/guidelines' },
  { label: 'Ethics', href: '/ethics' },
  { label: 'Contact', href: '/contact' },
];

export const TOP_INDIAN_UNIVERSITIES = [
  "Anna University, Chennai", "University of Madras, Chennai", "Bharathiar University, Coimbatore", "Bharathidasan University, Tiruchirappalli", "Madurai Kamaraj University, Madurai", "Annamalai University, Chidambaram", "Manonmaniam Sundaranar University, Tirunelveli", "Periyar University, Salem", "Alagappa University, Karaikudi", "Tamil Nadu Agricultural University (TNAU)", "Vellore Institute of Technology (VIT)", "SRM Institute of Science and Technology", "Amrita Vishwa Vidyapeetham, Coimbatore", "IIT Madras", "Jawaharlal Nehru University (JNU)", "Banaras Hindu University (BHU)", "University of Delhi", "University of Hyderabad", "Other"
];

export const PHD_COURSES_INDIA = [
  "Commerce & Management", "Economics & Finance", "Education & Psychology", "Social Sciences & Humanities", "Science & Technology", "Environmental Studies", "Digital Transformation", "Other"
];

export const EDITORIAL_BOARD: EditorialBoardMember[] = [
  {
    name: "Dr. Karthick B",
    designation: "Editor-in-Chief",
    department: "Editorial Board",
    institution: "JMRH Publications",
    address: "Gudalur, The Nilgiris – 643212, Tamil Nadu, India",
    officialEmail: "editor.jmrh@gmail.com",
    specialization: "Multidisciplinary Research & Academic Governance",
    profileLink: "#",
    role: "Editor-in-Chief"
  },
  {
    name: "Dr. K. Thamarai Selvi K",
    designation: "Assistant Professor of Commerce",
    department: "Department of Commerce",
    institution: "Government Arts College",
    address: "Gudalur, The Nilgiris – 643212, Tamil Nadu, India",
    officialEmail: "thamarai@ijems.org",
    specialization: "Entrepreneurship, Financial Inclusion, Digital Literacy",
    profileLink: "#",
    role: "Editorial Advisory Board"
  },
];

export const JOURNAL_PARTICULARS = [
  { label: "Frequency", value: "Monthly" },
  { label: "Mode", value: "Online" },
  { label: "Subject", value: "Multidisciplinary" },
  { label: "Language", value: "English" },
  { label: "Starting Year", value: "2025" },
];

export const MOCK_ARCHIVES: Issue[] = [
  {
    volume: 1,
    issueNo: 1,
    month: "January",
    year: 2025,
    articles: []
  }
];

export const MOCK_USERS: UserProfile[] = [];
export const MOCK_MANUSCRIPTS: Manuscript[] = [];
