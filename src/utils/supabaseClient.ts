// Dynamic, build-safe Supabase client loader
export type SupabaseClientLike = any
export let supabase: SupabaseClientLike | null = null

export async function getSupabaseClient(): Promise<SupabaseClientLike | null> {
  if (supabase) return supabase
  try {
    const mod = await (import('@supabase/supabase-js') as any)
    const createClient = (mod && (mod.createClient || mod.default?.createClient))
    const url = (import.meta as any).env?.VITE_SUPABASE_URL ?? ''
    const anon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? ''
    if (typeof createClient === 'function' && url && anon) {
      supabase = createClient(url, anon)
      return supabase
    }
  } catch (e) {
    // swallow; backend not configured for this environment
  }
  return null
}
