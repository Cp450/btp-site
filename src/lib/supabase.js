import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  const message = 'Variables Supabase manquantes : VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY non définies. Vérifie ton fichier .env (voir .env.example).'
  if (import.meta.env.DEV) {
    throw new Error(message)
  } else {
    console.error(message)
  }
}

export const supabase = createClient(url ?? '', anonKey ?? '')
