
import { createClient } from '@supabase/supabase-js'
 export const supabaseUrl = 'https://dwfugtopqtbpfylitfrg.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZnVndG9wcXRicGZ5bGl0ZnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjAwNzEsImV4cCI6MjAzMDEzNjA3MX0.kvHPTtOHMIjsjInHWrVxpEuN6t2o-nWtMMG2FJLiXbo'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase; 