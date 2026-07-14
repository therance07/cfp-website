export interface NewsArticle {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  category: 'products' | 'company' | 'export' | 'csr';
  date: string;
  image: string;
  author: string;
  readTime: number;
}

export const news: NewsArticle[] = [
  {
    slug: 'lancement-beurre-arachide-lisse-2024',
    title: 'CFP lance son beurre d\'arachide lisse : une nouvelle référence Made in Congo',
    titleEn: 'CFP launches smooth peanut butter: a new Made in Congo reference',
    excerpt: 'Congo Food Process enrichit sa gamme avec un beurre d\'arachide lisse onctueux, sans huile de palme, destiné aux marchés local et international.',
    excerptEn: 'Congo Food Process expands its range with a smooth, creamy peanut butter, palm oil-free, targeting both local and international markets.',
    content: `Congo Food Process franchit une nouvelle étape avec le lancement officiel de son beurre d'arachide lisse, une référence premium développée après 18 mois de R&D interne.\n\nCe nouveau produit, élaboré à partir d'arachides 100% congolaises soigneusement sélectionnées et torréfiées, répond à une demande croissante des consommateurs et distributeurs pour un produit sain, local et de qualité internationale.\n\n**Formulation innovante**\n\nSans huile de palme ajoutée, sans conservateurs artificiels, le beurre d'arachide lisse CFP se distingue par sa texture veloutée et son goût authentique. Il est disponible en formats 200g, 400g et 1kg pour le marché de détail, et en conditionnement 5kg pour la restauration et les professionnels.\n\n**Un marché en pleine expansion**\n\nLe marché du beurre d'arachide en Afrique centrale connaît une croissance soutenue, portée par l'urbanisation et la montée en gamme des habitudes alimentaires. CFP se positionne comme le producteur de référence au Congo-Brazzaville avec ce nouveau produit.\n\nDisponible dès maintenant dans les points de vente partenaires à Brazzaville et Pointe-Noire.`,
    contentEn: `Congo Food Process marks a new milestone with the official launch of its smooth peanut butter, a premium reference developed after 18 months of internal R&D.\n\nThis new product, crafted from 100% Congolese peanuts carefully selected and roasted, meets the growing demand from consumers and distributors for a healthy, local product of international quality.\n\n**Innovative formulation**\n\nFree from added palm oil and artificial preservatives, CFP's smooth peanut butter stands out for its velvety texture and authentic taste. It is available in 200g, 400g and 1kg retail formats, and in 5kg packaging for the food service and professional segments.\n\n**A growing market**\n\nThe peanut butter market in Central Africa is experiencing sustained growth, driven by urbanization and the upgrading of food habits. CFP is positioning itself as the reference producer in Congo-Brazzaville with this new product.\n\nAvailable now at partner retail points in Brazzaville and Pointe-Noire.`,
    category: 'products',
    date: '2024-11-15',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80',
    author: 'Équipe CFP',
    readTime: 4,
  },
  {
    slug: 'cfp-salon-agroalimentaire-dakar-2024',
    title: 'CFP représente le Congo au Salon International de l\'Agroalimentaire de Dakar',
    titleEn: 'CFP represents Congo at the Dakar International Food & Agriculture Fair',
    excerpt: 'Une délégation Congo Food Process a participé au SIAGRO-Dakar, présentant ses gammes à plus de 200 acheteurs professionnels africains et internationaux.',
    excerptEn: 'A Congo Food Process delegation attended SIAGRO-Dakar, presenting its product ranges to more than 200 African and international professional buyers.',
    content: `Du 18 au 22 septembre 2024, Congo Food Process a participé pour la première fois au Salon International de l'Agroalimentaire de Dakar (SIAGRO), l'un des événements de référence du secteur en Afrique de l'Ouest.\n\nCette participation marque une étape stratégique dans la démarche d'internationalisation de CFP. La délégation, conduite par le Directeur Général, a présenté l'ensemble de la gamme (pâtes et beurres d'arachide, chips de plantain, arachides enrobées et croquettes) à plus de 200 acheteurs professionnels.\n\n**Retombées concrètes**\n\nCinq accords de principe avec des distributeurs de la zone CEDEAO ont été signés au cours du salon. Des discussions avancées sont également en cours avec deux importateurs canadiens spécialisés dans les produits d'épicerie africaine.\n\n**Prochaines étapes**\n\nFort de ce succès, CFP prévoit de participer au SIAL Paris en 2025 pour accélérer son développement sur le marché européen et nord-américain.`,
    contentEn: `From September 18 to 22, 2024, Congo Food Process participated for the first time in the Dakar International Food & Agriculture Fair (SIAGRO), one of the reference events in the sector in West Africa.\n\nThis participation marks a strategic milestone in CFP's internationalization approach. The delegation, led by the General Manager, presented the full product range (peanut pastes and butters, plantain chips, coated peanuts and croquettes) to more than 200 professional buyers.\n\n**Concrete outcomes**\n\nFive preliminary agreements with ECOWAS-zone distributors were signed during the fair. Advanced discussions are also underway with two Canadian importers specializing in African grocery products.\n\n**Next steps**\n\nBuilding on this success, CFP plans to participate in SIAL Paris in 2025 to accelerate its development in the European and North American markets.`,
    category: 'export',
    date: '2024-09-25',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    author: 'Direction Générale',
    readTime: 3,
  },
  {
    slug: 'programme-formation-femmes-agriculteurs-mpila',
    title: '50 femmes agricultrices formées grâce au programme RSE de CFP',
    titleEn: '50 women farmers trained through CFP\'s CSR programme',
    excerpt: 'Dans le cadre de son engagement RSE, CFP a financé et organisé une formation de 3 semaines pour 50 productrices d\'arachides du Pool et du Plateaux.',
    excerptEn: 'As part of its CSR commitment, CFP financed and organized a 3-week training for 50 women peanut producers from Pool and Plateaux regions.',
    content: `Congo Food Process a lancé en juillet 2024 son premier programme de formation agricole destiné aux femmes productrices d'arachides des régions du Pool et des Plateaux.\n\nFinancé entièrement par CFP dans le cadre de sa politique RSE, ce programme de trois semaines a permis à 50 productrices de se former aux meilleures pratiques agricoles : sélection des semences, techniques de culture raisonnée, post-récolte et conservation.\n\n**Impact concret**\n\n- Augmentation estimée de 30% des rendements pour les participantes\n- Contrats d'approvisionnement préférentiels signés avec 35 productrices\n- Création d'une coopérative féminine de producteurs partenaires CFP\n\n**Engagement durable**\n\n"Nous ne pouvons construire une filière agroalimentaire solide sans investir dans ceux qui cultivent la matière première," déclare la Direction de CFP. "Ce programme est le début d'un partenariat à long terme avec nos fournisseurs locaux."`,
    contentEn: `Congo Food Process launched in July 2024 its first agricultural training programme for women peanut producers from the Pool and Plateaux regions.\n\nFully financed by CFP as part of its CSR policy, this three-week programme trained 50 women producers in best agricultural practices: seed selection, sustainable farming techniques, post-harvest handling and storage.\n\n**Concrete impact**\n\n- Estimated 30% yield increase for participants\n- Preferential supply contracts signed with 35 producers\n- Creation of a women's cooperative of CFP partner producers\n\n**Long-term commitment**\n\n"We cannot build a solid agri-food sector without investing in those who cultivate the raw material," says CFP Management. "This programme is the beginning of a long-term partnership with our local suppliers."`,
    category: 'csr',
    date: '2024-08-10',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    author: 'Département RSE',
    readTime: 4,
  },
  {
    slug: 'cfp-nouveau-site-production-2024',
    title: 'CFP inaugure son deuxième atelier de production à Mpila',
    titleEn: 'CFP inaugurates its second production workshop in Mpila',
    excerpt: 'L\'expansion de l\'usine CFP en zone SIASIC permet de doubler la capacité de transformation et d\'atteindre 1 600 kg d\'arachides traitées par jour.',
    excerptEn: 'The expansion of CFP\'s factory in the SIASIC zone doubles processing capacity to reach 1,600 kg of peanuts processed per day.',
    content: `Congo Food Process a inauguré en mai 2024 son deuxième atelier de production, toujours situé en zone industrielle SIASIC à Mpila, Brazzaville.\n\nCet investissement de plusieurs dizaines de millions de FCFA marque une étape capitale dans le développement de l'entreprise. La capacité totale de transformation passe de 800 kg à 1 600 kg d'arachides par jour.\n\n**Nouveaux équipements**\n\nL'atelier est équipé de lignes de production modernes : broyeurs industriels de dernière génération, enrobeuses à commande numérique, système de conditionnement automatisé et laboratoire de contrôle qualité indépendant.\n\n**Création d'emplois**\n\nCette expansion s'accompagne de la création de 12 emplois directs supplémentaires, portant l'effectif total de CFP à 27 employés permanents, majoritairement des femmes.\n\n**Vision 2027**\n\nCFP vise, d'ici 2027, à atteindre 3 000 kg de capacité journalière et à exporter 30% de sa production vers l'Afrique de l'Ouest et l'Amérique du Nord.`,
    contentEn: `Congo Food Process inaugurated in May 2024 its second production workshop, also located in the SIASIC industrial zone in Mpila, Brazzaville.\n\nThis investment of several tens of millions of FCFA marks a key stage in the company's development. Total processing capacity increases from 800 kg to 1,600 kg of peanuts per day.\n\n**New equipment**\n\nThe workshop is equipped with modern production lines: latest-generation industrial grinders, numerically controlled coating machines, automated packaging system and independent quality control laboratory.\n\n**Job creation**\n\nThis expansion is accompanied by the creation of 12 additional direct jobs, bringing CFP's total workforce to 27 permanent employees, the majority being women.\n\n**2027 vision**\n\nBy 2027, CFP aims to reach a daily capacity of 3,000 kg and to export 30% of its production to West Africa and North America.`,
    category: 'company',
    date: '2024-05-20',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
    author: 'Direction Générale',
    readTime: 3,
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((a) => a.slug === slug);
}

export function getNewsByCategory(category: NewsArticle['category']): NewsArticle[] {
  return news.filter((a) => a.category === category);
}
