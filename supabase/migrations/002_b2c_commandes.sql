-- ============================================================
-- CFP Website — Migration B2C
-- Ajoute le support des commandes B2C sur la table `commandes`
-- existante (partagée avec le B2B via la colonne `type`).
-- ============================================================

-- ─── Nouvelles colonnes B2C ─────────────────────────────────
ALTER TABLE commandes ADD COLUMN IF NOT EXISTS type              TEXT    NOT NULL DEFAULT 'B2B';
ALTER TABLE commandes ADD COLUMN IF NOT EXISTS produits          JSONB;
ALTER TABLE commandes ADD COLUMN IF NOT EXISTS montant_total     NUMERIC;
ALTER TABLE commandes ADD COLUMN IF NOT EXISTS ville             TEXT;
ALTER TABLE commandes ADD COLUMN IF NOT EXISTS adresse_livraison TEXT;

-- Empêche toute valeur autre que 'B2B' / 'B2C' (ex: faute de frappe 'b2c')
ALTER TABLE commandes ADD CONSTRAINT commandes_type_check CHECK (type IN ('B2B', 'B2C'));

-- ─── Colonnes B2B existantes sans sens pour le B2C ──────────
-- Rendues nullable : la contrainte "obligatoire pour le B2B" est
-- désormais portée uniquement par la validation Zod du formulaire
-- B2B côté application, pas par le schéma de la base.
ALTER TABLE commandes ALTER COLUMN entreprise          DROP NOT NULL;
ALTER TABLE commandes ALTER COLUMN email               DROP NOT NULL;
ALTER TABLE commandes ALTER COLUMN pays                DROP NOT NULL;
ALTER TABLE commandes ALTER COLUMN produits_interesses DROP NOT NULL;

-- ─── Colonnes réutilisées telles quelles (aucun changement) ─
-- contact_nom  : nom du contact B2B ET nom du client B2C (pas de colonne nom_client dédiée)
-- telephone    : téléphone du contact B2B ET du client B2C (reste NOT NULL, les deux flux le fournissent)
-- message      : notes B2B ET notes/instructions optionnelles du client B2C
