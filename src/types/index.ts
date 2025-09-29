// Tipos básicos para Productos de DummyJSON

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// Parámetros de búsqueda para productos
export interface ProductSearchParams {
    limit?: number;
    skip?: number;
    select?: string;
    q?: string; // Para búsqueda por texto
    category?: string;
    brand?: string;
    sortBy?: string;
    order?: string;
}

// Respuesta de la API de productos con paginación
export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

// Respuesta de un producto individual
export interface ProductResponse extends Product { }

// Respuesta de categorías
export interface CategoriesResponse {
    categories: string[];
}

// Respuesta de marcas
export interface BrandsResponse {
    brands: string[];
}
