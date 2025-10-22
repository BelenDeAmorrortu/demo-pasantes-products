import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useProductsStore } from "@/stores/productsStore";
import Card from "@/components/Card/Card";
import Select from "@/components/Select/Select";
import type { Product } from "@/types";
import styles from "./home.module.scss";

const Home = () => {
  const { products, params, set } = useProductsStore();
  const { data, isLoading, error } = useFetchProducts();

  // Opciones para los selects
  const sortOptions = [
    { value: "price-desc", label: "Precio mayor a menor" },
    { value: "price-asc", label: "Precio menor a mayor" },
    { value: "title-desc", label: "Titulo Z a A" },
    { value: "title-asc", label: "Titulo A a Z" },
  ];

  const limitOptions = [
    { value: "10", label: "10 productos" },
    { value: "20", label: "20 productos" },
    { value: "50", label: "50 productos" },
    { value: "100", label: "100 productos" },
  ];

  const handleSortChange = (value: string) => {
    const [sortBy, order] = value.split("-");
    set({ params: { ...params, sortBy, order } });
  };

  const handleLimitChange = (value: string) => {
    set({ params: { ...params, limit: parseInt(value), skip: 0 } });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set({ params: { ...params, q: event.target.value, skip: 0 } });
  };

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product);
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
              value={params.q || ""}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.selectsContainer}>
            <Select
              label="Ordenar por"
              options={sortOptions}
              value={`${params.sortBy || "price"}-${params.order || "desc"}`}
              onChange={handleSortChange}
              className={styles.select}
            />

            <Select
              label="Mostrar"
              options={limitOptions}
              value={params.limit?.toString() || "20"}
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
