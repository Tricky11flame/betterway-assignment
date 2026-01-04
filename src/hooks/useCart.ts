import { useState, useEffect } from 'react';
import { getCartFromStorage, getProductsFromStorage, saveCartToStorage } from '../utils/storage';
import { updateCartQuantity, generateBill } from '../utils/cartUtils';
import type { ProductMap,ProductId } from '../models/productType';
import type { CartState } from '../models/cartType';

export const useCart = () => {
    const productData: ProductMap = getProductsFromStorage()
    const [cart, setCart] = useState<CartState>(() => getCartFromStorage());
    useEffect(() => {
        saveCartToStorage(cart);
    }, [cart]);
    const handleUpdate = (id: ProductId, delta: number) => {
        const stock = productData[id]?.stock ?? 0;
        setCart(prev => updateCartQuantity(prev, id, delta, stock));
    };
    const bill = generateBill(cart, productData);
    return { cart, handleUpdate, bill };
};