# Plan: Supabase Integration & Auth Overhaul

## Overview
Implement a robust backend using Supabase for authentication and data storage. Redesign the authentication flow with a "Luxury Academic" aesthetic and enhance the Admin Dashboard for full control over users and research papers.

**Project Type**: WEB (React + Vite + Tailwind + Supabase)

## Success Criteria
- [ ] **Supabase Auth**: Functional Login/Signup with email verification.
- [ ] **Premium UI**: Professional, high-end design for Auth pages (Oxford Luxury).
- [ ] **Access Control**: "Trial" mode for guests; full access only for logged-in users.
- [ ] **Data Persistence**: All users and papers stored in Supabase.
- [ ] **Admin Control**: Dashboard reflects real-time data, paper downloads, and user management.
- [ ] **Archive Integration**: Admin-posted papers automatically appear in Archives.

## Architecture & Database Schema
- **Auth**: Supabase Auth (Email/Password).
- **Profiles Table**: `id (uuid, primary key)`, `full_name`, `email`, `role (enum: ADMIN, PROFESSOR, USER)`, `status`, `created_at`.
- **Papers Table**: `id (uuid)`, `author_id`, `title`, `abstract`, `discipline`, `status`, `file_url`, `submission_date`.
- **Storage**: `papers` bucket for PDF/Doc storage.

## Task Breakdown

### Phase 1: Supabase Setup (P0)
- **Task 1.1**: Install `@supabase/supabase-js`.
- **Task 1.2**: Create `src/integrations/supabase/client.ts` and `.env` template.
- **Task 1.3**: Define SQL schema for `profiles` and `papers` tables with RLS (Row Level Security).

### Phase 2: Auth Overhaul (P1)
- **Task 2.1**: Redesign `Auth.tsx` with cinematic animations and Oxford Luxury theme.
- **Task 2.2**: Implement `signUp` with `email` verification and `signIn` logic.
- **Task 2.3**: Create `useAuth` hook/context for global session management.

### Phase 3: Submission & Reviewer Protection (P1)
- **Task 3.1**: Implement "Trial Mode" for `SubmitPaper.tsx` and `ReviewerDashboard.tsx`.
- **Task 3.2**: Connect submission form to Supabase `papers` table and Storage.

### Phase 4: Admin Dashboard & Archives (P2)
- **Task 4.1**: Upgrade `AdminDashboard.tsx` to fetch profiles and papers from Supabase.
- **Task 4.2**: Add "Download" functionality for papers via signed URLs.
- **Task 4.3**: Implement "Publish to Archive" flow.
- **Task 4.4**: Update `Archives.tsx` to fetch from `papers` table where `status = 'PUBLISHED'`.

### Phase 5: Verification & Polish (X)
- [ ] Run `vulnerability-scanner` on Auth logic.
- [ ] Verify RLS policies protect user data.
- [ ] Final UI/UX audit for consistency.
