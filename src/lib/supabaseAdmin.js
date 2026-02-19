import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase Dashboard > Settings > API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY; // The sb_secret_... key

export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false, // Recommended for server-side admin clients
  },
});