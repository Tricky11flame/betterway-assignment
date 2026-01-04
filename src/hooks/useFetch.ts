import { useState, useEffect } from 'react';
import type { ProductMap } from '../models/productType';
import { saveProductsToStorage } from '../utils/storage';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } catch (err) {
        if(err instanceof Error){
            setError(err.message);
        }
        else{
            setError("unknown !!")
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  saveProductsToStorage(products);
  return { products, loading, error };
};