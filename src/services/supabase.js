import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://sjnjvkuyfolriyctbkms.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbmp2a3V5Zm9scml5Y3Ria21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDMyMTcsImV4cCI6MjAxMjM3OTIxN30.6lS7FBeKS_BeO7OWINVNWPURF1ytFt7B3nIyAE2fvKE"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;