import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsegqwijhcxdcxxkhqmx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZWdxd2lqaGN4ZGN4eGtocW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDg1MTcsImV4cCI6MjA2NTEyNDUxN30.8NaIwE5TKH_AOXYIIYCWAVHbDE_eIX7m043iwqwEk6s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
