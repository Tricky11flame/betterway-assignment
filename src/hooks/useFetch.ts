import { useState, useEffect } from 'react';
import type { ProductMap } from '../models/productType';
import { saveProductsToStorage, getProductsFromStorage } from '../utils/storage';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 1. Check Local Storage first
        const storedData = getProductsFromStorage();
        
        if (storedData && Object.keys(storedData).length > 0) {
          setProducts(storedData);
          setLoading(false);
          return; // Exit if data exists
        }

        // 2. Fetch if storage is empty
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch data');
        const json = await response.json();

        const sanitizedData: ProductMap = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        json.products.forEach((item: any) => {
          sanitizedData[item.id.toString()] = {
            productName: item.title,
            price: item.price,
            category: item.category,
            stock: item.stock,
            addedToCart: 0
          };
        });

        setProducts(sanitizedData);
        saveProductsToStorage(sanitizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, loading, error };
};