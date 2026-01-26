import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://budxpfzyllyvcuizixmr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZHhwZnp5bGx5dmN1aXppeG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNDQ3MDcsImV4cCI6MjA4NDYyMDcwN30.QTW_EES03orHjtd2dDDG5yW6Sm2blTQlwHS2Ubmqhi8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getSupabaseClient() {
  return supabase
}
