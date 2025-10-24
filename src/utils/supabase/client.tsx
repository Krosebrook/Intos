import { createClient as createSupabaseClient } from 'npm:@supabase/supabase-js@2';
import { projectId, publicAnonKey } from './info';

// Singleton Supabase client for frontend use
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * Create or return existing Supabase client instance
 * This is used for frontend operations including auth and storage
 */
export function createClient() {
  if (!supabaseInstance) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseInstance = createSupabaseClient(supabaseUrl, publicAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseInstance;
}

/**
 * Helper to get current user session
 */
export async function getCurrentSession() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

/**
 * Helper to get current user
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Helper to sign out
 */
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}
