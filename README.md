# Congo Food Process — Site Web Officiel

Site vitrine + B2B de **Congo Food Process (CFP)**, producteur agroalimentaire basé à Brazzaville, République du Congo. Produits : pâtes et beurres d'arachide, chips de plantain, arachides enrobées.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript strict |
| i18n | next-intl v4 (FR/EN, français par défaut) |
| Style | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion |
| Base de données | Supabase (PostgreSQL) |
| Formulaires | React Hook Form + Zod |
| Icônes | Lucide React (imports explicites) + SVG inline |
| Fonts | Montserrat, Nunito Sans, Barlow Condensed (next/font/google) |

## Prérequis

- Node.js 18+
- npm 9+
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

## Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-repo> cfp-website
cd cfp-website

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# puis remplir les valeurs dans .env.local
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Supabase — récupérer dans Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# WhatsApp (sans espaces, avec indicatif pays)
NEXT_PUBLIC_WHATSAPP_NUMBER=242065158296
```

> `SUPABASE_SERVICE_ROLE_KEY` est utilisé uniquement côté serveur (Server Actions admin). Ne jamais l'exposer côté client.

## Base de données (Supabase)

### Initialisation du schéma

Dans l'éditeur SQL de votre projet Supabase (ou via la CLI) :

```bash
# Avec la CLI Supabase
supabase db push

# Ou copier/coller le contenu de :
# supabase/migrations/001_init.sql
```

Le script crée les 4 tables suivantes avec RLS désactivé :

| Table | Description |
|-------|-------------|
| `contacts` | Messages du formulaire de contact public |
| `commandes` | Demandes de commandes B2B |
| `partenariats` | Demandes de partenariat / distribution |
| `contenu_site` | Contenu éditorial bilingue (FR/EN) géré depuis l'admin |

### Données fictives (développement)

```sql
-- Exécuter dans l'éditeur SQL Supabase
-- Contenu : contacts, commandes, partenariats, contenu_site de démonstration
\i supabase/seed.sql
```

### RLS (Row Level Security)

RLS est **désactivé** sur toutes les tables. L'accès est contrôlé côté application :
- Routes publiques → `NEXT_PUBLIC_SUPABASE_ANON_KEY` (insert uniquement via Server Actions)
- Dashboard admin → `SUPABASE_SERVICE_ROLE_KEY` (accès complet, protégé par l'auth Supabase)

## Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm run start
```

## Structure du projet

```
cfp-website/
├── app/
│   ├── [locale]/          # Routes i18n (FR/EN)
│   │   ├── page.tsx       # Accueil
│   │   ├── produits/      # Liste + fiche produit [slug]
│   │   ├── a-propos/
│   │   ├── qualite/
│   │   ├── distribution/
│   │   ├── contact/
│   │   └── actualites/    # Liste + article [slug]
│   ├── admin/             # Dashboard admin (protégé)
│   │   ├── login/
│   │   ├── contacts/
│   │   ├── commandes/
│   │   ├── partenariats/
│   │   └── contenu/
│   └── globals.css
├── components/
│   ├── ui/                # Composants de base
│   ├── layout/            # Header, Footer, WhatsAppButton, B2BBanner
│   ├── sections/          # HeroSection, StatsSection, ProductsGrid, forms
│   └── admin/             # AdminShell, AdminSidebar, StatCard, etc.
├── lib/
│   ├── products.ts        # Catalogue produits (données statiques)
│   ├── news.ts            # Articles (données statiques)
│   ├── testimonials.ts    # Témoignages (données statiques)
│   ├── supabase/          # Clients Supabase (server + browser)
│   └── actions/           # Server Actions (contact, commande, partenariat, admin)
├── messages/
│   ├── fr.json            # Traductions françaises
│   └── en.json            # Traductions anglaises
├── types/
│   └── supabase.ts        # Types TypeScript des tables Supabase
├── i18n/
│   ├── routing.ts         # defineRouting next-intl v4
│   ├── request.ts         # getRequestConfig
│   └── navigation.ts      # Link, useRouter, usePathname localisés
├── public/
│   ├── sitemap.xml        # Sitemap statique FR + EN
│   └── robots.txt
├── supabase/
│   ├── migrations/
│   │   └── 001_init.sql   # Schéma complet des 4 tables
│   └── seed.sql           # Données de démonstration
├── middleware.ts           # Auth admin + i18n routing
├── next.config.mjs
├── vercel.json
└── tailwind.config.ts
```

## Palette de couleurs

```css
--color-primary:   #F26522  /* Orange CFP */
--color-secondary: #2E7D1F  /* Vert forêt */
--color-dark:      #1A0F00  /* Brun foncé */
--color-cream:     #FFF8F0  /* Fond alternance sections */
```

## i18n (next-intl v4)

- Langue par défaut : **français** (pas de préfixe `/fr/`)
- Anglais : préfixé `/en/`
- `localePrefix: 'as-needed'`
- Toutes les traductions dans `messages/fr.json` et `messages/en.json`

## Admin Dashboard

Accessible sur `/admin/login`. Authentification via Supabase Auth (email + mot de passe).

**Créer un compte admin :**
1. Dans Supabase > Authentication > Users, cliquer "Invite user" ou "Add user"
2. Saisir l'email et le mot de passe de l'administrateur
3. Se connecter sur `/admin/login`

**Fonctionnalités :**
- Vue d'ensemble (statistiques contacts / commandes / partenariats)
- Gestion des contacts (marquer comme lu)
- Gestion des commandes B2B (changer le statut)
- Gestion des partenariats (changer le statut)
- Éditeur de contenu bilingue FR/EN

## Déploiement sur Vercel

```bash
# 1. Pousser le code sur GitHub/GitLab

# 2. Importer le projet sur vercel.com

# 3. Configurer les variables d'environnement dans
#    Vercel > Project > Settings > Environment Variables :
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
#    - SUPABASE_SERVICE_ROLE_KEY
#    - NEXT_PUBLIC_WHATSAPP_NUMBER

# 4. Déployer — le vercel.json à la racine configure automatiquement
#    les headers de sécurité HTTP
```

Le fichier `vercel.json` inclut les headers de sécurité HTTP :
`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`.

## SEO

- `sitemap.xml` statique dans `public/` — couvre toutes les routes FR et EN (hreflang)
- `robots.txt` — `/admin` exclu de l'indexation
- Métadonnées Open Graph sur chaque page via `generateMetadata()`
- Génération statique (`generateStaticParams`) pour les fiches produits et articles

## Données produits et articles

Les produits (`lib/products.ts`) et articles (`lib/news.ts`) sont des données **statiques** incluses dans le build. Pour les rendre dynamiques (gestion via admin), il faudrait ajouter les tables correspondantes dans Supabase et adapter les Server Components concernés.
