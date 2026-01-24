# 🗄️ Supabase Database Architecture & Setup

To ensure the JMRH platform functions correctly, you must execute the following SQL schema in your Supabase project's **SQL Editor**. This will establish the high-security tables, triggers, and the default administrative core.

---

## 1️⃣ Core Schema (Tables)

Run this block to create all necessary academic and auditing tables.

```sql
-- Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'USER' CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'USER', 'PUBLIC', 'PROFESSOR')),
  city TEXT,
  pincode TEXT,
  age INTEGER,
  phd_status TEXT CHECK (phd_status IN ('Yes', 'No', 'Pursuing')),
  department TEXT,
  institution_name TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Manuscripts Table
CREATE TABLE IF NOT EXISTS public.manuscripts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  professor_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED', 'UNDER_REVIEW', 'REVISION', 'ACCEPTED', 'REJECTED', 'PUBLISHED')),
  file_url TEXT,
  abstract TEXT,
  discipline TEXT,
  visibility TEXT DEFAULT 'Public' CHECK (visibility IN ('Public', 'Restricted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Visit Logs (Traffic Analytics)
CREATE TABLE IF NOT EXISTS public.visit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  ip TEXT,
  path TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Download Logs (Asset Audit)
CREATE TABLE IF NOT EXISTS public.download_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  file_name TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 📚 Create Issues Table (Archives)
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  volume INTEGER NOT NULL,
  issue_no INTEGER NOT NULL,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(volume, issue_no, year)
);

-- 📄 Create Articles Table (Published Papers)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  authors TEXT[] DEFAULT '{}',
  abstract TEXT,
  keywords TEXT[] DEFAULT '{}',
  pdf_url TEXT,
  doi TEXT,
  page_range TEXT,
  visibility TEXT DEFAULT 'Public' CHECK (visibility IN ('Public', 'Restricted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 2️⃣ Row Level Security (RLS) & Policies

Enable security and allow scholars to manage their own data while allowing Admins universal access.

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_logs ENABLE ROW LEVEL SECURITY;

-- 👤 Profiles Policies
CREATE POLICY "Public Profiles viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins manage all profiles" ON public.profiles ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- 📄 Manuscripts Policies
CREATE POLICY "Scholars view own submissions" ON public.manuscripts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Approved manuscripts are public" ON public.manuscripts FOR SELECT USING (status = 'PUBLISHED' OR visibility = 'Public');
CREATE POLICY "Scholars can insert submissions" ON public.manuscripts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Admins oversee repository" ON public.manuscripts ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- 📊 Logs Policies
CREATE POLICY "Authenticated users log visits" ON public.visit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view audit trail" ON public.visit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);
CREATE POLICY "Scholars log downloads" ON public.download_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view download trail" ON public.download_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);
```

---

## 3️⃣ Establishing the Default Admin

To create the "Real" Admin account:

1.  **Register through the App**: Go to the `/login` page and register as `admin@jmrh.org` (Password: `ScholarAdmin@2025`).
2.  **Elevate Role via SQL**: Once registered, run the following SQL command to grant yourself full governance privileges:

```sql
-- Grant Admin Privileges
UPDATE public.profiles 
SET role = 'ADMIN', is_verified = TRUE 
WHERE email = 'admin@jmrh.org';
```

---

## 4️⃣ Automatic Profile Creation (Trigger)

Run this to ensure that whenever a new user signs up via Auth, a profile entry is automatically created.

```sql
-- Trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (NEW.id, NEW.email, 'Scholar', split_part(NEW.email, '@', 1), 'USER')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 🔑 Real Credentials Summary

| Identity | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@jmrh.org` | `ScholarAdmin@2025` | **ADMIN** |
| **Default User** | `scholar@university.ac.in` | `ScholarPass123` | **USER** |

*Note: Passwords are managed by Supabase Auth (BCrypt hashing).*
