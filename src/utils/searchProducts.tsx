import {type ProductId ,type ProductMap } from "../models/productType";
export const searchProducts = (
    ids : ProductId[], 
    data: ProductMap, 
    query:string) => {
  if (!query) return ids;
  return ids.filter((id:ProductId) => 
    data[id].productName.toLowerCase().includes(query.toLowerCase())
  );
};