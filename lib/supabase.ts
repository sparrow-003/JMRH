
import { createClient } from '@supabase/supabase-js';

// Project Credentials
const supabaseUrl = 'https://budxpfzyllyvcuizixmr.supabase.co';
const supabaseKey = 'sb_publishable_Q1b_jo3_n2KZfUm7fACN8Q_uOLmwyqP';

// Persistence is enabled by default in the Supabase JS client using localStorage.
// This ensures the "Footprint" session remains active.
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
