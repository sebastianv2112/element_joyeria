import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qcmxgjriixsfzpxnrfzx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbXhnanJpaXhzZnpweG5yZnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzYzODQsImV4cCI6MjA5NDIxMjM4NH0.G1qh1_Jcly9vzWk4iAuTAFVBcnEiSjtZ5hVxITn1qtY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
