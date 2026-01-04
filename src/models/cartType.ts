import type { ProductId } from "./productType";

export interface CartItem {
  id: ProductId;
  quantity: number;
}
export type CartState = Record<ProductId, number>; 
export interface BillItem  {
    name: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}
export interface BillDetail {
  items: Array<BillItem>;
  totalQuantity: number;
  totalCost: number;
}