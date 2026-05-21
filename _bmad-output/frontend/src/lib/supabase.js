import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // Warn without crashing — app renders fine, Supabase calls silently fail
  console.warn(
    '[Fogatech] Variables Supabase manquantes : VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY non définies.\n' +
    'Copie .env.example → .env et renseigne tes clés Supabase pour activer la BDD.'
  )
}

// Fallback placeholders keep createClient happy; queries return empty without crashing
export const supabase = createClient(
  url ?? 'https://placeholder.supabase.co',
  anonKey ?? 'placeholder-anon-key'
)
