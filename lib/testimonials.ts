export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  quote: string;
  quoteEn: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Parfait Mvoula',
    role: 'Responsable achats',
    company: 'Supermarchés Casino Brazzaville',
    country: 'Congo-Brazzaville',
    quote: 'CFP est notre fournisseur local préféré. La qualité est constante, la livraison est fiable et les produits se vendent très bien. Le beurre d\'arachide CFP est en rupture de stock dès le lendemain de chaque livraison.',
    quoteEn: 'CFP is our preferred local supplier. Quality is consistent, delivery is reliable and products sell very well. CFP peanut butter sells out the day after each delivery.',
    avatar: '/images/temoignage-1.webp',
    rating: 5,
  },
  {
    id: '2',
    name: 'Donatienne Louzolo',
    role: 'Fondatrice',
    company: 'Congo Saveurs — Épicerie africaine',
    country: 'Montréal, Canada',
    quote: 'Nous importons les chips de plantain et les beurres d\'arachide CFP depuis 2023 pour notre épicerie à Montréal. Nos clients de la diaspora congolaise sont conquis. La documentation export est impeccable, ce qui facilite énormément nos démarches douanières.',
    quoteEn: 'We have been importing CFP plantain chips and peanut butters since 2023 for our grocery store in Montreal. Our Congolese diaspora customers are won over. The export documentation is impeccable, which greatly simplifies our customs procedures.',
    avatar: '/images/temoignage-2.webp',
    rating: 5,
  },
  {
    id: '3',
    name: 'Bénédicte Loemba',
    role: 'Gérante',
    company: 'Grossiste Alimentaire Talangaï',
    country: 'Congo-Brazzaville',
    quote: 'Je tiens un grossiste alimentaire à Talangaï et les produits CFP comptent parmi mes meilleures ventes. La pâte d\'arachide et les croquettes partent vite, mes clients redemandent toujours les mêmes références. Les livraisons sont ponctuelles et je n\'ai jamais eu de souci de qualité.',
    quoteEn: 'I run a food wholesale business in Talangaï and CFP products are among my best sellers. Peanut paste and croquettes sell fast, my customers always come back for the same items. Deliveries are punctual and I\'ve never had a quality issue.',
    avatar: '/images/temoignage-3.webp',
    rating: 5,
  },
];
