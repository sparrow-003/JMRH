import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'ADMIN' | 'PROFESSOR' | 'USER';
export type UserStatus = 'ACTIVE' | 'BANNED';
export type PaperStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'REVISION_REQUIRED' | 'ACCEPTED' | 'REJECTED';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
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
}

interface JMRHState {
    users: User[];
    papers: Paper[];
    currentUser: User | null;

    // Auth Actions
    setCurrentUser: (user: User | null) => void;
    registerUser: (name: string, email: string) => void;

    // Admin Actions
    banUser: (userId: string) => void;
    unbanUser: (userId: string) => void;
    createProfessor: (name: string, email: string) => void;
    assignPaper: (paperId: string, professorId: string) => void;

    // Paper Actions
    submitPaper: (title: string, abstract: string, discipline: string) => void;
    updatePaperStatus: (paperId: string, status: PaperStatus, comments?: string) => void;
}

// Initial Mock Data
const MOCK_USERS: User[] = [
    { id: 'admin-1', name: 'Super Admin', email: 'admin@jmrh.in', role: 'ADMIN', status: 'ACTIVE', createdAt: '2025-01-01' },
    { id: 'prof-1', name: 'Dr. Sarah Wilson', email: 'sarah.w@jmrh.in', role: 'PROFESSOR', status: 'ACTIVE', createdAt: '2025-01-10' },
    { id: 'prof-2', name: 'Prof. James Chen', email: 'james.c@jmrh.in', role: 'PROFESSOR', status: 'ACTIVE', createdAt: '2025-01-12' },
];

export const useJMRHStore = create<JMRHState>()(
    persist(
        (set, get) => ({
            users: MOCK_USERS,
            papers: [],
            currentUser: null,

            setCurrentUser: (user) => set({ currentUser: user }),

            registerUser: (name, email) => set((state) => ({
                users: [...state.users, {
                    id: `user-${Math.random().toString(36).substr(2, 9)}`,
                    name,
                    email,
                    role: 'USER',
                    status: 'ACTIVE',
                    createdAt: new Date().toISOString().split('T')[0]
                }]
            })),

            banUser: (userId) => set((state) => ({
                users: state.users.map(u => u.id === userId ? { ...u, status: 'BANNED' } : u)
            })),

            unbanUser: (userId) => set((state) => ({
                users: state.users.map(u => u.id === userId ? { ...u, status: 'ACTIVE' } : u)
            })),

            createProfessor: (name, email) => set((state) => ({
                users: [...state.users, {
                    id: `prof-${Math.random().toString(36).substr(2, 9)}`,
                    name,
                    email,
                    role: 'PROFESSOR',
                    status: 'ACTIVE',
                    createdAt: new Date().toISOString().split('T')[0]
                }]
            })),

            assignPaper: (paperId, professorId) => set((state) => ({
                papers: state.papers.map(p => p.id === paperId ? {
                    ...p,
                    status: 'UNDER_REVIEW',
                    assignedProfessorId: professorId
                } : p)
            })),

            submitPaper: (title, abstract, discipline) => {
                const { currentUser } = get();
                if (!currentUser) return;
                set((state) => ({
                    papers: [...state.papers, {
                        id: `paper-${Math.random().toString(36).substr(2, 9)}`,
                        authorId: currentUser.id,
                        authorName: currentUser.name,
                        title,
                        abstract,
                        discipline,
                        status: 'SUBMITTED',
                        submissionDate: new Date().toISOString().split('T')[0]
                    }]
                }));
            },

            updatePaperStatus: (paperId, status, comments) => set((state) => ({
                papers: state.papers.map(p => p.id === paperId ? { ...p, status, revisionComments: comments } : p)
            })),
        }),
        {
            name: 'jmrh-storage',
        }
    )
);
