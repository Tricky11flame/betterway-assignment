export type ProductId = string;
export type ProcutCategory = string;
export interface Product {
  productName: string;
  price: number;
  category: string;
  stock: number;
  addedToCart: number;
}
export type ProductMap = Record<string, Product>;

// export interface ProductState {
//   fullData: ProductMap;
//   visibleIds: ProductId[];
//   filters: ProductFilters;
// }