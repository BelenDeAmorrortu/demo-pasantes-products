import { create } from "zustand";
import type { Product, ProductSearchParams } from "../types";

interface ProductsState {
  // Estado
  products: Product[];
  total: number;
  params: ProductSearchParams;

  // Acciones básicas
  set: (state: Partial<ProductsState>) => void;
  reset: () => void;
}

const initialState = {
  products: [],
  total: 0,
  params: {
    limit: 20,
    skip: 0,
    order: "desc",
    sortBy: "rating",
  },
};

export const useProductsStore = create<ProductsState>()((set) => ({
  ...initialState,

  set: (newState) => set(newState),
  reset: () => set(initialState),
}));
