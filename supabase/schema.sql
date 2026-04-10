-- ============================================================
-- Fogatech BTP — Supabase Schema (idempotent — safe to re-run)
-- Paste the entire file in: Dashboard → SQL Editor → New query
-- ============================================================

-- ── engins ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS engins (
  id        TEXT PRIMARY KEY,
  icon      TEXT,
  name      TEXT NOT NULL,
  available INTEGER NOT NULL DEFAULT 0,
  total     INTEGER NOT NULL DEFAULT 0,
  price     TEXT,
  tag       TEXT
);

INSERT INTO engins (id, icon, name, available, total, price, tag) VALUES
  ('bull',   '🚜', 'Bulldozers',           12, 15, '250K FCFA/j', 'Disponible'),
  ('grue',   '🏗️', 'Grues mobiles',         8, 10, '400K FCFA/j', 'Disponible'),
  ('pelle',  '⛏️', 'Pelles hydrauliques',   15, 18, '200K FCFA/j', 'Disponible'),
  ('compac', '🛞', 'Compacteurs',            6,  8, '150K FCFA/j', 'Disponible'),
  ('beton',  '🔩', 'Bétonnières',           20, 20, '80K FCFA/j',  'Stock complet'),
  ('camion', '🚛', 'Camions benne',          4, 12, '180K FCFA/j', 'Limité')
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'engins'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE engins;
  END IF;
END $$;

-- ── chantier_updates ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chantier_updates (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_email TEXT NOT NULL,
  chef_name    TEXT,
  content      TEXT NOT NULL,
  photo        TEXT,
  pct          INTEGER,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE chantier_updates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "client_read_own_updates" ON chantier_updates;
CREATE POLICY "client_read_own_updates"
  ON chantier_updates FOR SELECT
  USING (client_email = auth.jwt() ->> 'email');

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'chantier_updates'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE chantier_updates;
  END IF;
END $$;

-- ── reviews ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name  TEXT NOT NULL,
  project_type TEXT,
  ville        TEXT,
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT NOT NULL,
  verified     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_verified_reviews" ON reviews;
CREATE POLICY "read_verified_reviews"
  ON reviews FOR SELECT
  USING (verified = TRUE);

DROP POLICY IF EXISTS "insert_review" ON reviews;
CREATE POLICY "insert_review"
  ON reviews FOR INSERT
  WITH CHECK (TRUE);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'reviews'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
  END IF;
END $$;

INSERT INTO reviews (client_name, project_type, ville, rating, comment, verified, created_at) VALUES
  ('Jean-Pierre M.', 'Villa R+2',         'Bacongo',         5, 'Chantier livré 3 semaines avant le délai prévu. Transparence totale sur les coûts. Je recommande à 100%.', true, '2026-03-15'),
  ('Marie-Ange K.',  'Local commercial',  'Diaspora (Paris)', 5, 'Suivi en temps réel bluffant. On voyait l''avancement chaque jour depuis Paris. Chef de projet très professionnel.', true, '2026-02-28'),
  ('Théodore N.',    'Route rurale 4km',  'Pool',             4, 'Très bon travail. Quelques jours de retard mais communication exemplaire. On a été informés à chaque étape.', true, '2026-01-20'),
  ('Solange B.',     'Immeuble R+3',      'Moungali',         5, 'Mokolo na mokolo — c''est vraiment leur philosophie. Budget respecté à 2% près.', true, '2025-12-10'),
  ('Patrick D.',     'Location Grue 25T', 'Poto-Poto',        4, 'Engin livré en 18h au lieu de 24h. Opérateur compétent et ponctuel.', true, '2026-03-02')
ON CONFLICT DO NOTHING;

-- ── devis_requests ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS devis_requests (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile     TEXT,
  nom         TEXT NOT NULL,
  email       TEXT,
  tel         TEXT,
  categorie   TEXT,
  budget      TEXT,
  description TEXT,
  ville       TEXT,
  quartier    TEXT,
  surface     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE devis_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_devis" ON devis_requests;
CREATE POLICY "insert_devis"
  ON devis_requests FOR INSERT
  WITH CHECK (TRUE);
