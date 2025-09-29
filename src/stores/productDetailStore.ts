import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product } from '../types';

interface ProductDetailState {
    // Estado
    product: Product | null;

    // Acciones básicas
    set: (state: Partial<ProductDetailState>) => void;
    reset: () => void;
}

const initialState = {
    product: null,
};

export const useProductDetailStore = create<ProductDetailState>()(
    devtools(
        (set) => ({
            ...initialState,

            set: (newState) => set(newState),
            reset: () => set(initialState)
        }),
        {
            name: 'product-detail-store'
        }
    )
);
