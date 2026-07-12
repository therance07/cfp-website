export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: Contact;
        Insert: ContactInsert;
        Update: Partial<ContactInsert>;
      };
      commandes: {
        Row: Commande;
        Insert: CommandeInsert;
        Update: Partial<CommandeInsert>;
      };
      partenariats: {
        Row: Partenariat;
        Insert: PartenariatInsert;
        Update: Partial<PartenariatInsert>;
      };
      contenu_site: {
        Row: ContenuSite;
        Insert: ContenuSiteInsert;
        Update: Partial<ContenuSiteInsert>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export interface Contact {
  id: string;
  nom: string;
  email: string;
  telephone: string | null;
  objet: string | null;
  message: string;
  lu: boolean;
  created_at: string;
}

export interface ContactInsert {
  nom: string;
  email: string;
  telephone?: string | null;
  objet?: string | null;
  message: string;
  lu?: boolean;
}

export interface CommandeProduit {
  produit_id: string;
  nom: string;
  quantite: number;
  prix_unitaire: number;
  variante: string | null;
}

export interface Commande {
  id: string;
  type: 'B2B' | 'B2C';
  entreprise: string | null;
  contact_nom: string;
  email: string | null;
  telephone: string;
  pays: string | null;
  produits_interesses: string | null;
  quantite_estimee: string | null;
  message: string | null;
  produits: CommandeProduit[] | null;
  montant_total: number | null;
  ville: string | null;
  adresse_livraison: string | null;
  statut: 'en_attente' | 'en_traitement' | 'confirmee';
  created_at: string;
}

export interface CommandeInsert {
  type?: 'B2B' | 'B2C';
  entreprise?: string | null;
  contact_nom: string;
  email?: string | null;
  telephone: string;
  pays?: string | null;
  produits_interesses?: string | null;
  quantite_estimee?: string | null;
  message?: string | null;
  produits?: CommandeProduit[] | null;
  montant_total?: number | null;
  ville?: string | null;
  adresse_livraison?: string | null;
  statut?: 'en_attente' | 'en_traitement' | 'confirmee';
}

export interface Partenariat {
  id: string;
  entreprise: string;
  contact_nom: string;
  email: string;
  telephone: string;
  pays: string;
  type_partenariat: string;
  zone_distribution: string | null;
  message: string | null;
  statut: 'en_attente' | 'en_traitement' | 'confirmee';
  created_at: string;
}

export interface PartenariatInsert {
  entreprise: string;
  contact_nom: string;
  email: string;
  telephone: string;
  pays: string;
  type_partenariat: string;
  zone_distribution?: string | null;
  message?: string | null;
  statut?: 'en_attente' | 'en_traitement' | 'confirmee';
}

export interface ContenuSite {
  id: string;
  cle: string;
  valeur_fr: string | null;
  valeur_en: string | null;
  updated_at: string;
}

export interface ContenuSiteInsert {
  cle: string;
  valeur_fr?: string | null;
  valeur_en?: string | null;
}
