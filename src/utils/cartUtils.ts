import type {  ProductId,ProductMap } from "../models/productType.ts";
import type { CartState,BillDetail } from "../models/cartType.ts";

export const updateCartQuantity = (
    cart: CartState,
    productId: ProductId,
    delta: number,
    stockLimit: number
    ): CartState => {

    const currentQty = cart[productId] || 0;
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      const updatedCart = { ...cart }; 
      delete updatedCart[productId];   
      return updatedCart;
    }
    if (newQty > stockLimit) return cart;
    return { ...cart, [productId]: newQty };
};

export const removeFromCart = (
    cart: CartState, productId: ProductId
    ): CartState => {
    const newCart = { ...cart };
    delete newCart[productId];
    return newCart;
};

export const calculateTotals = (cart: CartState, products: ProductMap) => {
  return Object.entries(cart).reduce(
    (acc, [id, qty]) => {
      const product = products[id];
      if (product) {
        acc.totalItems += qty;
        acc.totalPrice += product.price * qty;
      }
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );
};

export const generateBill = (cart: CartState, products: ProductMap): BillDetail => {
  return Object.entries(cart).reduce((acc, [id, quantity]) => {
    const product = products[id];
    if (!product) return acc; 
    const subTotal = product.price * quantity;
    acc.items.push({
      name: product.productName,
      quantity,
      unitPrice: product.price,
      subTotal,
    });
    acc.totalQuantity += quantity;
    acc.totalCost += subTotal;
    return acc;
  }, 
    { items: [], totalQuantity: 0, totalCost: 0 } as BillDetail);
};