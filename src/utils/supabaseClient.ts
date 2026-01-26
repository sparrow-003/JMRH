// Minimal, backend-agnostic placeholder for Supabase client loader.
// In this patch, we always return null to force demo/localStorage paths.
export async function getSupabaseClient(): Promise<any | null> {
  return null
}
