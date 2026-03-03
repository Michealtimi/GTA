import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Only create client if credentials are available
export const supabase = supabaseUrl && supabaseServiceRoleKey 
	? createClient(supabaseUrl, supabaseServiceRoleKey)
	: null;

