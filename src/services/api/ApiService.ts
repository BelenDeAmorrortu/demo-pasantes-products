import { axiosInstance } from './axiosInstance'
import type { ProductSearchParams, ProductsResponse, ProductResponse } from '../../types'

// Obtener lista de productos con paginación y filtros
const getProducts = (params: ProductSearchParams = {}) => {
    const searchParams = new URLSearchParams();

    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.skip) searchParams.append('skip', params.skip.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.order) searchParams.append('order', params.order);
    if (params.q) searchParams.append('q', params.q);

    const queryString = searchParams.toString();
    const url = queryString && params.q ? `/products/search?${queryString}` : queryString ? `/products?${queryString}` : '/products';

    return axiosInstance.get(url) as Promise<ProductsResponse>;
}

// Obtener un producto específico por ID
const getProduct = (id: number) =>
    axiosInstance.get(`/products/${id}`) as Promise<ProductResponse>


export const ApiService = {
    getProducts,
    getProduct,
};