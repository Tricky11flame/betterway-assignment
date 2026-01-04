import {type ProductId ,type ProductMap } from "../models/productType";
export const sortProducts = (
    ids:ProductId[], 
    data:ProductMap, 
    sortType:boolean
    ) : ProductId[] => {
  const sorted = [...ids];
  if (sortType == true ) {
    // ascending 
    return sorted.sort((a:ProductId,b:ProductId) => data[a].price - data[b].price);
  }
  if (sortType == false) {
    // descending 
    return sorted.sort((a:ProductId,b:ProductId) => data[b].price - data[a].price);
  }
  return sorted;
};