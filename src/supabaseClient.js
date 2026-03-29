import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://njbmupxckghcpfmadgbw.supabase.co'
const supabaseKey = 'sb_publishable_rRQ3O_r0KSCV8DgOI6ZAAw_hTkgguf2'

export const supabase = createClient(supabaseUrl, supabaseKey)