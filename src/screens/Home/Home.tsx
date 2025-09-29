import { useFetchProducts } from '@/hooks/useFetchProducts';
import { useProductsStore } from '@/stores/productsStore';
import Card from '@/components/Card/Card';
import Select from '@/components/Select/Select';
import type { Product } from '@/types';
import styles from './home.module.scss';

const Home = () => {
    const { products, params, set } = useProductsStore();
    const { data, isLoading, error } = useFetchProducts();

    // Opciones para los selects
    const sortByOptions = [
        { value: 'rating', label: 'Calificación' },
        { value: 'price', label: 'Precio' },
        { value: 'title', label: 'Título' },
    ];

    const orderOptions = [
        { value: 'desc', label: 'Descendente' },
        { value: 'asc', label: 'Ascendente' }
    ];

    const limitOptions = [
        { value: '10', label: '10 productos' },
        { value: '20', label: '20 productos' },
        { value: '50', label: '50 productos' },
        { value: '100', label: '100 productos' }
    ];

    const handleSortByChange = (value: string) => {
        set({ params: { ...params, sortBy: value } });
    };

    const handleOrderChange = (value: string) => {
        set({ params: { ...params, order: value } });
    };

    const handleLimitChange = (value: string) => {
        set({ params: { ...params, limit: parseInt(value), skip: 0 } });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set({ params: { ...params, q: event.target.value, skip: 0 } });
    };

    const handleProductClick = (product: Product) => {
        // Aquí puedes implementar la navegación al detalle del producto
        console.log('Product clicked:', product);
    };

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h2>Error al cargar los productos</h2>
                <p>Por favor, intenta de nuevo más tarde.</p>
            </div>
        );
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Catálogo de Productos</h1>

                <div className={styles.filters}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={params.q || ''}
                            onChange={handleSearchChange}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.selectsContainer}>
                        <Select
                            label="Ordenar por"
                            options={sortByOptions}
                            value={params.sortBy || 'rating'}
                            onChange={handleSortByChange}
                            className={styles.select}
                        />

                        <Select
                            label="Orden"
                            options={orderOptions}
                            value={params.order || 'desc'}
                            onChange={handleOrderChange}
                            className={styles.select}
                        />

                        <Select
                            label="Mostrar"
                            options={limitOptions}
                            value={params.limit?.toString() || '20'}
                            onChange={handleLimitChange}
                            className={styles.select}
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Cargando productos...</p>
                </div>
            ) : (
                <>
                    <div className={styles.resultsInfo}>
                        <p>
                            Mostrando {products.length} de {data?.total || 0} productos
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className={styles.emptyContainer}>
                            <h3>No se encontraron productos</h3>
                            <p>Intenta ajustar los filtros de búsqueda.</p>
                        </div>
                    ) : (
                        <div className={styles.productsGrid}>
                            {products.map((product) => (
                                <Card
                                    key={product.id}
                                    product={product}
                                    onClick={handleProductClick}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
