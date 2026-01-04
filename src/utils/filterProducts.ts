import {type ProductId ,type ProductMap, type ProcutCategory } from "../models/productType";
export const filterByCategory = (
    ids : ProductId[],
    data : ProductMap, 
    category:ProcutCategory
    ) : ProductId[] => {
  if (category == "All" || category == "all") return ids;
  return ids.filter((id:ProductId) => data[id].category === category);
};
