// Supabase client is loaded lazily at runtime to avoid hard dependencies during build
export type SupabaseClientLike = any
export let supabase: SupabaseClientLike | null = null

export async function getSupabaseClient(): Promise<SupabaseClientLike | null> {
  if (supabase) return supabase
  try {
    const mod = await import('@supabase/supabase-js')
    const createClient = (mod as any).createClient ?? (mod as any).default?.createClient
    const url = (import.meta as any).env?.VITE_SUPABASE_URL ?? ''
    const anon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? ''
    if (typeof createClient === 'function' && url && anon) {
      supabase = createClient(url, anon)
      return supabase
    }
  } catch (e) {
    // Supabase not available in this environment; keep supabase as null
  }
  return null
}
