import type { ProductCardData } from '@/components/ProductCard';

export const products: ProductCardData[] = [
  {
    slug: 'pate-arachide-nature',
    name: 'Natural Peanut Paste',
    nameFr: 'Pâte d\'arachide nature',
    description: 'Pâte 100% arachide sans additifs, idéale pour la cuisine traditionnelle congolaise et les sauces.',
    image: 'https://images.unsplash.com/photo-1567892737950-30c4db0b53a1?w=800&q=80',
    category: 'tartinables',
    categoryLabel: 'Tartinables',
    conditionnements: ['250g', '500g', '1kg', '5kg'],
    isBestSeller: true,
  },
  {
    slug: 'beurre-arachide-croustillant',
    name: 'Crunchy Peanut Butter',
    nameFr: 'Beurre d\'arachide croustillant',
    description: 'Beurre d\'arachide avec morceaux croquants, riche en protéines, sans huile de palme ajoutée.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80',
    category: 'tartinables',
    categoryLabel: 'Tartinables',
    conditionnements: ['200g', '400g', '1kg'],
    isBestSeller: true,
  },
  {
    slug: 'chips-banane-plantain',
    name: 'Plantain Chips',
    nameFr: 'Chips de banane plantain',
    description: 'Chips croustillantes de banane plantain légèrement salées, snack emblématique du Congo.',
    image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800&q=80',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['50g', '100g', '250g', '1kg'],
    isNew: false,
  },
  {
    slug: 'arachides-enrobees-piment',
    name: 'Chili Coated Peanuts',
    nameFr: 'Arachides enrobées piment',
    description: 'Arachides grillées enrobées d\'une couche épicée au piment, croquantes et savoureuses.',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&q=80',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['100g', '250g', '500g'],
  },
  {
    slug: 'beurre-arachide-lisse',
    name: 'Smooth Peanut Butter',
    nameFr: 'Beurre d\'arachide lisse',
    description: 'Texture veloutée, goût doux et authentique. Parfait pour le petit-déjeuner et les préparations culinaires.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80',
    category: 'tartinables',
    categoryLabel: 'Tartinables',
    conditionnements: ['200g', '400g', '1kg'],
    isNew: true,
  },
  {
    slug: 'arachides-sucrees-caramel',
    name: 'Caramel Glazed Peanuts',
    nameFr: 'Arachides caramélisées',
    description: 'Arachides enrobées de caramel doré, parfaites pour les moments de gourmandise.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    category: 'sucres',
    categoryLabel: 'Sucrés',
    conditionnements: ['100g', '200g'],
    isNew: true,
  },
  {
    slug: 'croquettes-arachide',
    name: 'Peanut Croquettes',
    nameFr: 'Croquettes d\'arachide',
    description: 'Croquettes légères et croustillantes à base d\'arachides, aromatisées aux épices locales.',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&q=80',
    category: 'snacks',
    categoryLabel: 'Snacks',
    conditionnements: ['80g', '150g', '300g'],
  },
  {
    slug: 'arachides-salees-grillees',
    name: 'Roasted Salted Peanuts',
    nameFr: 'Arachides grillées salées',
    description: 'Arachides torréfiées à la perfection, légèrement salées. Le snack incontournable.',
    image: 'https://images.unsplash.com/photo-1567892737950-30c4db0b53a1?w=800&q=80',
    category: 'sales',
    categoryLabel: 'Salés',
    conditionnements: ['100g', '250g', '500g', '1kg'],
    isBestSeller: true,
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
