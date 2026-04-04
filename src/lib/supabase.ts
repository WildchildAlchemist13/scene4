import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mzdsptkhnmztyrgnqkbt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZHNwdGtobm16dHlyZ25xa2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTc5MTYsImV4cCI6MjA5MDc3MzkxNn0.hUruUyPUU_l_LVEtx1QgzUnZ_nvyXthPKqhM0atRZrc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
