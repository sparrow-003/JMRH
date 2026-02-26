-- Supabase database initialization for admin/user documents and profiles
-- Ensure the pgcrypto extension is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS profiles (
  user_id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_by TEXT REFERENCES profiles(user_id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  is_public BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'submitted',
  review_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_documents_uploaded_at ON documents (uploaded_at);
-- Updated for git commit
