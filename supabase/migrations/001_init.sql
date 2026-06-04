-- ============================================================
-- CFP Website — Migration initiale
-- 4 tables : contacts, commandes, partenariats, contenu_site
-- RLS désactivé (accès géré côté application via service role)
-- ============================================================

-- ─── contacts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nom        TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  telephone  TEXT,
  objet      TEXT,
  message    TEXT        NOT NULL,
  lu         BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- ─── commandes (B2B) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS commandes (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  entreprise          TEXT        NOT NULL,
  contact_nom         TEXT        NOT NULL,
  email               TEXT        NOT NULL,
  telephone           TEXT        NOT NULL,
  pays                TEXT        NOT NULL,
  produits_interesses TEXT        NOT NULL,
  quantite_estimee    TEXT,
  message             TEXT,
  statut              TEXT        NOT NULL DEFAULT 'en_attente'
                        CHECK (statut IN ('en_attente', 'en_traitement', 'confirmee')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE commandes DISABLE ROW LEVEL SECURITY;

-- ─── partenariats ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partenariats (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  entreprise       TEXT        NOT NULL,
  contact_nom      TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  telephone        TEXT        NOT NULL,
  pays             TEXT        NOT NULL,
  type_partenariat TEXT        NOT NULL,
  zone_distribution TEXT,
  message          TEXT,
  statut           TEXT        NOT NULL DEFAULT 'en_attente'
                     CHECK (statut IN ('en_attente', 'en_traitement', 'confirmee')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE partenariats DISABLE ROW LEVEL SECURITY;

-- ─── contenu_site ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contenu_site (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  cle        TEXT        NOT NULL UNIQUE,
  valeur_fr  TEXT,
  valeur_en  TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE contenu_site DISABLE ROW LEVEL SECURITY;

-- Index pour les requêtes admin fréquentes
CREATE INDEX IF NOT EXISTS idx_contacts_lu         ON contacts (lu, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commandes_statut    ON commandes (statut, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partenariats_statut ON partenariats (statut, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contenu_cle         ON contenu_site (cle);
