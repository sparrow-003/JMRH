
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'PUBLIC' | 'PROFESSOR';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  city: string;
  pincode: string;
  age: number;
  phdStatus: 'Yes' | 'No' | 'Pursuing';
  department: string;
  institutionName?: string;
  secureToken?: string;
  isVerified: boolean;
  status: 'Active' | 'Suspended' | 'Pending';
  createdAt: string;
}

export interface VisitLog {
  id: string;
  user_id?: string;
  ip: string;
  path: string;
  timestamp: string;
  user_agent?: string;
}

export interface DownloadLog {
  id: string;
  user_id: string;
  file_name: string;
  timestamp: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface Manuscript {
  id: string;
  title: string;
  author_id: string;
  professor_id?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'REVISION' | 'ACCEPTED' | 'REJECTED' | 'PUBLISHED';
  file_url?: string;
  visibility: 'Public' | 'Restricted';
  created_at: string;
  // Added uploadDate for dashboard display compatibility
  uploadDate?: string;
  author_profile?: {
    first_name: string;
    last_name: string;
    email: string;
    institution_name: string;
  };
}

export interface EditorialBoardMember {
  name: string;
  designation: string;
  department: string;
  institution: string;
  address: string;
  officialEmail: string;
  specialization: string;
  profileLink?: string;
  role?: string;
}

export interface Article {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  pdfUrl: string;
  doi?: string;
  pageRange: string;
  visibility: 'Public' | 'Restricted';
  createdAt: string;
}

export interface Issue {
  volume: number;
  issueNo: number;
  month: string;
  year: number;
  articles: Article[];
}

export interface NavItem {
  label: string;
  href: string;
  roles?: UserRole[];
}
