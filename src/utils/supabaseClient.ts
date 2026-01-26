import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Configure via environment variables (Vite): VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase: SupabaseClient | null = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null
