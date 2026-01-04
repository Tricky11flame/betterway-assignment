const CART_KEY = "app_cart";
import type { CartState } from "../models/cartType";
export const saveCartToStorage = (cart: CartState): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
export const getCartFromStorage = (): CartState => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : {};
};