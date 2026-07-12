'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'cfp_panier';

export interface CartItem {
  produit_id: string;
  nom: string;
  prix_unitaire: number;
  quantite: number;
  variante: string | null;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantite'> & { quantite?: number }) => void;
  removeFromCart: (produit_id: string, variante: string | null) => void;
  updateQuantity: (produit_id: string, variante: string | null, quantite: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const sameLine = (a: { produit_id: string; variante: string | null }, produit_id: string, variante: string | null) =>
  a.produit_id === produit_id && a.variante === variante;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restauration depuis localStorage au montage (uniquement côté client)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage indisponible ou contenu corrompu : on repart d'un panier vide
    }
    setHydrated(true);
  }, []);

  // Synchronisation à chaque changement (après hydratation, pour ne pas écraser
  // le panier sauvegardé avec le tableau vide de l'état initial)
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantite'> & { quantite?: number }) => {
    const quantiteToAdd = item.quantite ?? 1;
    setItems((prev) => {
      const existing = prev.find((l) => sameLine(l, item.produit_id, item.variante));
      if (existing) {
        return prev.map((l) =>
          sameLine(l, item.produit_id, item.variante)
            ? { ...l, quantite: l.quantite + quantiteToAdd }
            : l
        );
      }
      return [...prev, { ...item, quantite: quantiteToAdd }];
    });
  }, []);

  const removeFromCart = useCallback((produit_id: string, variante: string | null) => {
    setItems((prev) => prev.filter((l) => !sameLine(l, produit_id, variante)));
  }, []);

  const updateQuantity = useCallback((produit_id: string, variante: string | null, quantite: number) => {
    if (quantite <= 0) {
      setItems((prev) => prev.filter((l) => !sameLine(l, produit_id, variante)));
      return;
    }
    setItems((prev) =>
      prev.map((l) => (sameLine(l, produit_id, variante) ? { ...l, quantite } : l))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, l) => sum + l.prix_unitaire * l.quantite, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, l) => sum + l.quantite, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider');
  return ctx;
}
