import type { ProductCardData } from '@/components/ProductCard';

export const products: ProductCardData[] = [
  {
    slug: 'pate-arachide-nature',
    name: 'Natural Peanut Paste',
    nameFr: 'Pâte d\'arachide nature',
    description: 'Pâte 100% arachide sans additifs, idéale pour la cuisine traditionnelle congolaise et les sauces.',
    image: '/images/products/pate-arachide-nature.webp',
    category: 'tartinables',
    categoryLabel: 'Tartinables',
    conditionnements: ['250g', '500g', '1kg', '5kg'],
    isBestSeller: true,
  },
  {
    slug: 'beurre-cacahouete-nature',
    name: 'Natural Peanut Butter',
    nameFr: 'Beurre de cacahouète nature',
    description: 'Beurre de cacahouète onctueux et nature, sans huile de palme ajoutée. Parfait pour le petit-déjeuner et les préparations culinaires.',
    image: '/images/products/beurre-cacahouete.webp',
    category: 'tartinables',
    categoryLabel: 'Tartinables',
    conditionnements: ['200g', '400g', '1kg'],
    isBestSeller: true,
  },
  {
    slug: 'arachides-enrobees',
    name: 'Coated Peanuts',
    nameFr: 'Arachides enrobées',
    description: 'Arachides grillées enrobées d\'une fine couche croustillante, un snack gourmand et addictif.',
    image: '/images/products/arachides-enrobees.webp',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['100g', '250g', '500g'],
  },
  {
    slug: 'arachides-salees',
    name: 'Roasted Salted Peanuts',
    nameFr: 'Arachides salées',
    description: 'Arachides torréfiées à la perfection, légèrement salées. Le snack incontournable.',
    image: '/images/products/arachides-sale.webp',
    category: 'sales',
    categoryLabel: 'Salés',
    conditionnements: ['100g', '250g', '500g', '1kg'],
    isBestSeller: true,
  },
  {
    slug: 'arachides-sucrees-caramel',
    name: 'Caramel Glazed Peanuts',
    nameFr: 'Arachides sucrées (caramel)',
    description: 'Arachides enrobées de caramel doré, parfaites pour les moments de gourmandise.',
    image: '/images/products/arachides-sucre.webp',
    category: 'sucres',
    categoryLabel: 'Sucrés',
    conditionnements: ['100g', '200g'],
    isNew: true,
  },
  {
    slug: 'arachides-pimente',
    name: 'Spicy Peanuts',
    nameFr: 'Arachides pimenté',
    description: 'Arachides grillées relevées d\'une pointe de piment, pour les amateurs de saveurs corsées.',
    image: '/images/products/arachides-pimente.webp',
    category: 'sales',
    categoryLabel: 'Salés',
    conditionnements: ['100g', '250g', '500g', '1kg'],
    isNew: true,
  },
  {
    slug: 'arachides-mais',
    name: 'Salted Peanuts & Roasted Corn',
    nameFr: 'Arachides salé + maïs torréfié',
    description: 'Mélange croustillant d\'arachides salées et de maïs torréfié, un duo gourmand 100% local.',
    image: '/images/products/arachides-mais.webp',
    category: 'sales',
    categoryLabel: 'Salés',
    conditionnements: ['100g', '250g', '500g', '1kg'],
    isNew: true,
  },
  {
    slug: 'chips-plantain-salees',
    name: 'Salted Plantain Chips',
    nameFr: 'Chips de banane plantain salées',
    description: 'Chips croustillantes de banane plantain légèrement salées, snack emblématique du Congo.',
    image: '/images/products/chips-plantain-sale.webp',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['50g', '100g', '250g', '1kg'],
  },
  {
    slug: 'chips-plantain-sucrees',
    name: 'Sweet Plantain Chips',
    nameFr: 'Chips de banane plantain sucrées',
    description: 'Chips de banane plantain caramélisées, sucrées et fondantes, pour une pause gourmande.',
    image: '/images/products/chips-plantain-sucre.webp',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['50g', '100g', '250g', '1kg'],
    isNew: true,
  },
  {
    slug: 'croquettes',
    name: 'Peanut Croquettes',
    nameFr: 'Croquettes (diverses variétés)',
    description: 'Croquettes légères et croustillantes à base d\'arachides, déclinées en plusieurs variétés gourmandes.',
    image: '/images/products/croquette.webp',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['80g', '150g', '300g'],
    variantes: ['Nature', 'Pâte d\'arachide', 'Pépites d\'arachide', 'Noix de coco'],
  },
  {
    slug: 'beignets-souffles',
    name: 'Puffed Fritters',
    nameFr: 'Beignets soufflés',
    description: 'Beignets soufflés moelleux, dorés et gourmands, un classique de la pâtisserie congolaise.',
    image: '/images/products/beignets-souffles.webp',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['100g', '250g', '500g'],
  },
];

export const categories = [
  { id: 'all',         label: 'Tous', labelEn: 'All' },
  { id: 'tartinables', label: 'Tartinables', labelEn: 'Spreads' },
  { id: 'snacks',      label: 'Snacks', labelEn: 'Snacks' },
  { id: 'sucres',      label: 'Sucrés', labelEn: 'Sweet' },
  { id: 'sales',       label: 'Salés', labelEn: 'Savoury' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export function getProductBySlug(slug: string): ProductCardData | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(count = 4): ProductCardData[] {
  return products.filter((p) => p.isBestSeller || p.isNew).slice(0, count);
}
