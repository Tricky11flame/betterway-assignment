const CART_KEY = "app_cart";
import type { ProductMap } from "../models/productType";
import type { CartState } from "../models/cartType";
export const saveCartToStorage = (cart: CartState): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
export const getCartFromStorage = (): CartState => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveProductsToStorage = (products: ProductMap) => {
  localStorage.setItem("product_catalog", JSON.stringify(products));
};

export const getProductsFromStorage = (): ProductMap => {
  const data = localStorage.getItem("product_catalog");
  return data ? JSON.parse(data) : {};
};