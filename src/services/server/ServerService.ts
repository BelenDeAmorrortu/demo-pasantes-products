import type { Product } from "@/types";
import { jsonServerClient } from "./serverAxiosInstance";

export type FavoriteRecord = Product;

export const fetchFavorites = () =>
  jsonServerClient.get<FavoriteRecord[]>(`/favorites`);

export const addFavorite = (product: Product) =>
  jsonServerClient.post<FavoriteRecord>(`/favorites`, product);

export const removeFavorite = (productId: number) =>
  jsonServerClient.delete<void>(`/favorites/${String(productId)}`);

export const FavoritesService = {
  fetchFavorites,
  addFavorite,
  removeFavorite,
};
