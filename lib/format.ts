export function formatPrice(prix: number): string {
  return `${prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
}

interface CommandeProduitLike {
  nom: string;
  quantite: number;
  variante: string | null;
}

export function formatCommandeProduits(produits: CommandeProduitLike[] | null): string {
  if (!produits || produits.length === 0) return '-';
  return produits
    .map((p) => `${p.quantite}× ${p.nom}${p.variante ? ` (${p.variante})` : ''}`)
    .join(', ');
}
