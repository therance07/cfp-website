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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Aristide Nkouka',
    role: 'Directeur commercial',
    company: 'Groupe CFAO Distribution Congo',
    country: 'Congo-Brazzaville',
    quote: 'Le partenariat avec CFP nous a permis de répondre à la demande croissante pour des snacks locaux de qualité dans notre réseau de distribution. L\'équipe CFP est professionnelle, réactive et orientée solutions. Une collaboration exemplaire.',
    quoteEn: 'The partnership with CFP has enabled us to meet the growing demand for quality local snacks in our distribution network. The CFP team is professional, responsive and solution-oriented. An exemplary collaboration.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
  },
];
