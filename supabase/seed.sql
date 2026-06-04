-- ============================================================
-- CFP Website — Données fictives (seed)
-- Contacts, commandes B2B, partenariats, contenu éditorial
-- ============================================================

-- ─── contacts ───────────────────────────────────────────────
INSERT INTO contacts (nom, email, telephone, objet, message, lu, created_at) VALUES
  ('Marie Makosso',    'marie.makosso@gmail.com',      '+242065123456', 'Disponibilité produits',
   'Bonjour, je cherche vos pâtes d''arachide en format 5kg pour mon restaurant. Sont-elles disponibles à Pointe-Noire ?',
   true,  now() - interval '5 days'),
  ('Jean-Pierre Mouto', 'jp.mouto@outlook.com',        '+242066789012', 'Question livraison',
   'Je souhaiterais savoir si vous effectuez des livraisons à domicile à Brazzaville. Merci.',
   true,  now() - interval '3 days'),
  ('Adèle Nguesso',    'adele.nguesso@yahoo.fr',       '+242055321654', 'Produits halal',
   'Vos produits sont-ils certifiés halal ? Je recherche des snacks pour une épicerie communautaire.',
   false, now() - interval '1 day'),
  ('Paul Itoua',       'paul.itoua@congobusiness.cg',  '+242064987321', 'Collaboration école',
   'Je suis directeur d''un lycée et souhaiterais proposer vos produits à notre cantine scolaire.',
   false, now() - interval '6 hours');

-- ─── commandes B2B ──────────────────────────────────────────
INSERT INTO commandes (entreprise, contact_nom, email, telephone, pays, produits_interesses, quantite_estimee, message, statut, created_at) VALUES
  ('Épicerie Afrique Plus',   'Kofi Asante',       'kofi.asante@afriqueplus.ca',     '+14385551234',
   'Canada',        'Pâte d''arachide nature 1kg, Beurre d''arachide lisse 400g',
   '500 unités / mois', 'Nous distribuons des produits africains au Québec. Intéressés par un accord annuel.',
   'en_traitement', now() - interval '10 days'),
  ('Supermarché Mbonda',      'Georgette Mbonda',  'g.mbonda@supermbonda.cg',        '+242065111222',
   'Congo',         'Chips de banane plantain 100g, Arachides grillées salées 250g, Arachides enrobées piment 100g',
   '200 cartons / semaine', 'Chaîne de 3 supermarchés à Brazzaville, cherchons fournisseur régulier.',
   'confirmee',     now() - interval '20 days'),
  ('Import Saveurs d''Afrique', 'Fatou Diallo',    'fatou.diallo@saveurs-afrique.fr', '+33612345678',
   'France',        'Gamme complète — toutes références',
   '1 palette test (300 kg)', 'Épicerie spécialisée produits africains à Paris 18e. Commande test avant référencement.',
   'en_attente',    now() - interval '2 days'),
  ('Grossiste Luba SARL',     'Théodore Luba',     't.luba@lubasarl.cg',             '+242066333444',
   'Congo',         'Beurre d''arachide croustillant 1kg, Pâte d''arachide nature 5kg',
   '100 unités de chaque', NULL,
   'en_attente',    now() - interval '18 hours');

-- ─── partenariats ───────────────────────────────────────────
INSERT INTO partenariats (entreprise, contact_nom, email, telephone, pays, type_partenariat, zone_distribution, message, statut, created_at) VALUES
  ('African Grocery Network',  'Samuel Owusu',    's.owusu@agn-logistics.com',   '+16135559876',
   'Canada',   'distributeur',     'Québec, Ontario',
   'Réseau de distribution spécialisé produits africains au Canada. Cherchons producteurs en croissance.',
   'en_traitement', now() - interval '15 days'),
  ('Boulangerie Pâtisserie Victoire', 'Victoire Loukia', 'victoire@bpv-brazza.cg', '+242065777888',
   'Congo',    'revendeur',        'Brazzaville centre',
   'Nous souhaitons intégrer vos beurres d''arachide dans notre gamme de produits de boulangerie.',
   'confirmee',     now() - interval '30 days'),
  ('West Africa Foods GmbH',   'Hans-Peter Müller', 'h.mueller@wafgmbh.de',       '+4915112345678',
   'Allemagne', 'distributeur',    'DACH (Allemagne, Autriche, Suisse)',
   'Importateur de produits africains en Allemagne. Très intéressé par les chips plantain et arachides.',
   'en_attente',    now() - interval '3 days');

-- ─── contenu_site ───────────────────────────────────────────
INSERT INTO contenu_site (cle, valeur_fr, valeur_en) VALUES
  ('hero_titre',
   'L''Authenticité Congolaise en Pot',
   'The Taste of Congo in Every Jar'),
  ('hero_sous_titre',
   'Produits agroalimentaires artisanaux — fabriqués à Brazzaville depuis 2018',
   'Handcrafted agri-food products — made in Brazzaville since 2018'),
  ('about_mission',
   'Valoriser les ressources agricoles du Congo en transformant des matières premières locales de qualité en produits alimentaires sains, savoureux et accessibles.',
   'To valorise Congo''s agricultural resources by transforming quality local raw materials into healthy, tasty and accessible food products.'),
  ('footer_tagline',
   'Fait au Congo. Pour le monde.',
   'Made in Congo. For the World.'),
  ('stats_annees',          '6',   '6'),
  ('stats_produits',        '12',  '12'),
  ('stats_employes',        '27',  '27'),
  ('stats_pays_export',     '8',   '8'),
  ('stats_tonnes_annuelles','120', '120'),
  ('contact_adresse',
   'Zone Industrielle SIASIC, Mpila, Brazzaville, République du Congo',
   'SIASIC Industrial Zone, Mpila, Brazzaville, Republic of Congo'),
  ('contact_email',         'contact@congofoodprocess.com', 'contact@congofoodprocess.com'),
  ('contact_telephone',     '+242 06 515 82 96',           '+242 06 515 82 96'),
  ('qualite_iso_statut',
   'Certification ISO 22000 en cours d''obtention — audit prévu T1 2025',
   'ISO 22000 certification in progress — audit planned Q1 2025');
