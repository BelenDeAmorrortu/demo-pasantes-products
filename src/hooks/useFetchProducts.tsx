import type { ProductsResponse } from "@/types";
import { useProductsStore } from "@/stores/productsStore";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api/ApiService";
import { useEffect } from "react";

export const useFetchProducts = () => {
    const { params, set } = useProductsStore();

    const query = useQuery<ProductsResponse>({
        queryKey: ['products', params.limit, params.skip, params.order, params.sortBy, params.q],
        queryFn: () => ApiService.getProducts(params)
    });

    useEffect(() => {
        if (query.data) {
            set({
                products: query.data.products,
                total: query.data.total
            });
        }
    }, [query.data]);

    return query;
};
