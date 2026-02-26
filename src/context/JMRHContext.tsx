import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'ADMIN' | 'PROFESSOR' | 'USER';
export type UserStatus = 'ACTIVE' | 'BANNED';
export type PaperStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'REVISION_REQUIRED' | 'ACCEPTED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    pincode?: string;
    city?: string;
    dob?: string;
    address?: string;
    phoneNumber?: string;
    age?: string;
    degree?: string;
    university?: string;
    college?: string;
    department?: string;
    studyType?: string;
    specialization?: string;
    bio?: string;
}

export interface Paper {
    id: string;
    authorId: string;
    authorName: string;
    title: string;
    abstract: string;
    discipline: string;
    status: PaperStatus;
    assignedProfessorId?: string;
    submissionDate: string;
    revisionComments?: string;
    attachments?: string[];
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    content: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

// Helper to cast supabase client for untyped tables
const db = supabase as any;

interface JMRHContextType {
    users: User[];
    papers: Paper[];
    reviews: Review[];
    currentUser: User | null;
    isLoading: boolean;
    setCurrentUser: (user: User | null) => void;
    signIn: (email: string, pass: string) => Promise<void>;
    signUp: (name: string, email: string, pass: string, details: any) => Promise<void>;
    updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
    banUser: (userId: string) => Promise<void>;
    unbanUser: (userId: string) => Promise<void>;
    createProfessor: (name: string, email: string, details: any) => Promise<void>;
    assignPaper: (paperId: string, professorId: string) => Promise<void>;
    submitPaper: (title: string, abstract: string, discipline: string, authorName: string, attachments: string[]) => Promise<void>;
    updatePaper: (paperId: string, updates: any) => Promise<void>;
    updatePaperStatus: (paperId: string, status: PaperStatus, comments?: string) => Promise<void>;
    addReview: (content: string, rating: number) => Promise<void>;
    updateReview: (reviewId: string, content: string, rating: number) => Promise<void>;
    deleteReview: (reviewId: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshData: () => Promise<void>;
}

const JMRHContext = createContext<JMRHContextType | undefined>(undefined);

const mapProfile = (p: any): User => ({
    id: p.id,
    name: p.name || '',
    email: p.email || '',
    role: (p.role || 'USER') as UserRole,
    status: (p.status || 'ACTIVE') as UserStatus,
    createdAt: p.created_at || '',
    pincode: p.pincode,
    city: p.city,
    dob: p.dob,
    address: p.address,
    phoneNumber: p.phone_number,
    age: p.age,
    degree: p.degree,
    university: p.university,
    college: p.college,
    department: p.department,
    studyType: p.study_type,
    specialization: p.specialization,
    bio: p.bio,
});

const mapPaper = (p: any): Paper => ({
    id: p.id,
    authorId: p.author_id,
    authorName: p.author_name || '',
    title: p.title || '',
    abstract: p.abstract || '',
    discipline: p.discipline || '',
    status: p.status as PaperStatus,
    assignedProfessorId: p.assigned_professor_id,
    submissionDate: p.submission_date || '',
    revisionComments: p.revision_comments,
    attachments: p.attachments,
});

const mapReview = (r: any): Review => ({
    id: r.id,
    userId: r.user_id,
    userName: r.user_name || '',
    content: r.content || '',
    rating: r.rating,
    createdAt: r.created_at || '',
    updatedAt: r.updated_at || '',
});

export const JMRHProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchUserProfile = async (userId: string): Promise<User | null> => {
        const { data: profile } = await db.from('profiles').select('*').eq('id', userId).maybeSingle();
        if (!profile) return null;

        // Fetch role from user_roles
        const { data: roles } = await db.from('user_roles').select('role').eq('user_id', userId);
        const userRole = roles?.[0]?.role?.toUpperCase() || 'USER';

        return { ...mapProfile(profile), role: userRole as UserRole };
    };

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id);
                if (profile) setCurrentUser(profile);
            }
            setIsLoading(false);
        };

        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT') {
                setCurrentUser(null);
                return;
            }
            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id);
                if (profile) setCurrentUser(profile);
            }
        });

        refreshData();

        return () => subscription.unsubscribe();
    }, []);

    const refreshData = async () => {
        const [profilesRes, papersRes, reviewsRes] = await Promise.all([
            db.from('profiles').select('*'),
            db.from('papers').select('*'),
            db.from('reviews').select('*'),
        ]);

        if (profilesRes.data) setUsers(profilesRes.data.map(mapProfile));
        if (papersRes.data) setPapers(papersRes.data.map(mapPaper));
        if (reviewsRes.data) setReviews(reviewsRes.data.map(mapReview));
    };

    const signIn = async (email: string, pass: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        toast({ title: "Authentication Success", description: "Welcome back to JMRH" });
    };

    const signUp = async (name: string, email: string, pass: string, details: any) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
            options: { data: { full_name: name, ...details } }
        });
        if (error) throw error;
        toast({ title: "Registration Success", description: "Please check your email for verification link." });
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setCurrentUser(null);
    };

    const updateUser = async (userId: string, updates: Partial<User>) => {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.email !== undefined) dbUpdates.email = updates.email;
        if (updates.status !== undefined) dbUpdates.status = updates.status;
        if (updates.pincode !== undefined) dbUpdates.pincode = updates.pincode;
        if (updates.city !== undefined) dbUpdates.city = updates.city;
        if (updates.dob !== undefined) dbUpdates.dob = updates.dob;
        if (updates.address !== undefined) dbUpdates.address = updates.address;
        if (updates.phoneNumber !== undefined) dbUpdates.phone_number = updates.phoneNumber;
        if (updates.age !== undefined) dbUpdates.age = updates.age;
        if (updates.degree !== undefined) dbUpdates.degree = updates.degree;
        if (updates.university !== undefined) dbUpdates.university = updates.university;
        if (updates.college !== undefined) dbUpdates.college = updates.college;
        if (updates.department !== undefined) dbUpdates.department = updates.department;
        if (updates.studyType !== undefined) dbUpdates.study_type = updates.studyType;
        if (updates.specialization !== undefined) dbUpdates.specialization = updates.specialization;
        if (updates.bio !== undefined) dbUpdates.bio = updates.bio;

        const { error } = await db.from('profiles').update(dbUpdates).eq('id', userId);
        if (error) throw error;
        await refreshData();
    };

    const banUser = async (userId: string) => updateUser(userId, { status: 'BANNED' });
    const unbanUser = async (userId: string) => updateUser(userId, { status: 'ACTIVE' });

    const createProfessor = async (name: string, email: string, details: any) => {
        const { error } = await db.from('profiles').insert({ name, email, status: 'ACTIVE', ...details });
        if (error) throw error;
        await refreshData();
    };

    const assignPaper = async (paperId: string, professorId: string) => {
        const { error } = await db.from('papers').update({ status: 'UNDER_REVIEW', assigned_professor_id: professorId }).eq('id', paperId);
        if (error) throw error;
        await refreshData();
    };

    const submitPaper = async (title: string, abstract: string, discipline: string, authorName: string, attachments: string[]) => {
        if (!currentUser) return;
        const { error } = await db.from('papers').insert({
            author_id: currentUser.id,
            author_name: authorName || currentUser.name,
            title, abstract, discipline,
            status: 'SUBMITTED',
            submission_date: new Date().toISOString().split('T')[0],
            attachments
        });
        if (error) throw error;
        await refreshData();
    };

    const updatePaper = async (paperId: string, updates: any) => {
        const { error } = await db.from('papers').update(updates).eq('id', paperId);
        if (error) throw error;
        await refreshData();
    };

    const updatePaperStatus = async (paperId: string, status: PaperStatus, comments?: string) => {
        const { error } = await db.from('papers').update({ status, revision_comments: comments }).eq('id', paperId);
        if (error) throw error;
        await refreshData();
    };

    const addReview = async (content: string, rating: number) => {
        if (!currentUser) return;
        const { error } = await db.from('reviews').insert({
            user_id: currentUser.id,
            user_name: currentUser.name,
            content, rating,
        });
        if (error) throw error;
        await refreshData();
    };

    const updateReview = async (reviewId: string, content: string, rating: number) => {
        const { error } = await db.from('reviews').update({ content, rating }).eq('id', reviewId);
        if (error) throw error;
        await refreshData();
    };

    const deleteReview = async (reviewId: string) => {
        const { error } = await db.from('reviews').delete().eq('id', reviewId);
        if (error) throw error;
        await refreshData();
    };

    return (
        <JMRHContext.Provider value={{
            users, papers, reviews, currentUser, isLoading, setCurrentUser, signIn, signUp, updateUser,
            banUser, unbanUser, createProfessor, assignPaper,
            submitPaper, updatePaper, updatePaperStatus, addReview, updateReview, deleteReview, logout, refreshData
        }}>
            {children}
        </JMRHContext.Provider>
    );
};

export const useJMRH = () => {
    const context = useContext(JMRHContext);
    if (!context) throw new Error('useJMRH must be used within a JMRHProvider');
    return context;
};
